import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_TABLE_DATA } from '../graphQL/Queries';
import { UserContext } from '../UserContext';

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const { loading, error, data } = useQuery(LOAD_TABLE_DATA, {
    variables: { tableName: username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.getAddressInfo.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.phoneNo}</td>
              <td>{item.dateOfbirth}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
