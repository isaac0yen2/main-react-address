import React, { useContext} from 'react';
import { useQuery } from '@apollo/client';
import { LOAD_TABLE_DATA } from '../graphQL/Queries';
import { UserContext } from '../UserContext';
import { Modal } from 'bootstrap';

const Dashboard = () => {
  const { username } = useContext(UserContext);
  let modal;
  const handleShowModal = () => {
    if (!modal) {
      const modalElement = document.querySelector('.modal');
      modal = new Modal(modalElement);
    }
    modal.show();
  };
  const handleCloseModal = () => {
    if (!modal) {
      const modalElement = document.querySelector('.modal');
      modal = new Modal(modalElement);
    }
    modal.hide();
  };
  const { loading, error, data } = useQuery(LOAD_TABLE_DATA, {
    variables: { tableName: username },
  });

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
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="form">
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Phone Number"
                />
                <input
                  className="form-control mb-2"
                  type="date"
                  placeholder="Date of Birth"
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Address"
                />
              </form>
            </div>
            <div className="modal-footer">
              {/* Submit Button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseModal}
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
