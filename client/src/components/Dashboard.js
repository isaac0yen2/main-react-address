import React, {useState, useContext} from 'react';
import { useQuery } from '@apollo/client';
import {useMutation} from '@apollo/client'
import ADD_USER_INFO from '../graphQL/Mutations'
import { LOAD_TABLE_DATA } from '../graphQL/Queries';
import { UserContext } from '../UserContext';
import { Modal } from 'bootstrap';

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfbirth, setdateOfbirth] = useState("");
  const [address, setAddress] = useState("");


  let modal;
  const handleShowModal = () => {
    if (!modal) {
      let modalElement = document.querySelector('.modal');
      modal = new Modal(modalElement);
    }
    modal.show();
  };
  const handleCloseModal = () => {
    if (modal) {
      modal.hide();
    } else {
      modal = new Modal(document.querySelector('.modal'));
      modal.hide();
    }
  };
  let { loading, error, data } = useQuery(LOAD_TABLE_DATA, {
    variables: { tableName: username },
  });
  let [addAddressInfo] = useMutation(ADD_USER_INFO, {
    onCompleted: data => {
console.log(data)
    },
    onError: error => {
      console.log(JSON.stringify(error,null,2));
    }
  });

  let addUserFunction = async () => {
    if (username && firstName && lastName && phoneNo && dateOfbirth && address) {
      let tableName = username
      console.log((firstName,lastName,phoneNo,dateOfbirth,address),'and the username is ' + username)
      addAddressInfo({
              variables: {
                  tableName:tableName,
                  firstName:firstName,
                  lastName:lastName,
                  phoneNo: +phoneNo,
                  dateOfbirth:dateOfbirth,
                  address:address
              },
          });
          handleCloseModal();
    } else {
      alert("empty feild located")
    }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
            <h1>Dashboard</h1>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.getAddressInfo.map((item) => (
            <tr key={item.firstName}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.phoneNo}</td>
              <td>{item.dateOfbirth}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={handleShowModal}
      >
        Add User
      </button>

      {/* Modal */}
      <div
        className={"modal fade"}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">
                Add User
              </h5>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="form">
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="First Name"
                  onChange={e =>setFirstName(e.target.value)}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Last Name"
                  onChange={e =>setLastName(e.target.value)}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Phone Number"
                  onChange={e =>setPhoneNo(e.target.value)}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Date of Birth"
                  onChange={e =>setdateOfbirth(e.target.value)}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Address"
                  onChange={e =>{setAddress(e.target.value)}}
                  required
                />
              </form>
            </div>
            <div className="modal-footer">
              {/* Submit Button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={addUserFunction}
              >
                Add User
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
