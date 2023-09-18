import React, { useState, useContext, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_USER_INFO, DELETE_USER_INFO } from "../graphQL/Mutations";
import { LOAD_TABLE_DATA } from "../graphQL/Queries";
import { UserContext } from "../UserContext";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { EDIT_CURRENT_FEILD } from "../graphQL/Mutations";

const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("asdfghjkl");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(null)
  const [dataDisplayed, setDataDisplayed] = useState(null);
  const navigate = useNavigate();

  const updateFirstNameRef = useRef();
  const updateLastNameRef = useRef();
  const updatePhoneNoRef = useRef();
  const updateDateOfBirthRef = useRef();
  const updateAddressRef = useRef();

  let resetValue = () => {
    setFirstName("");
    setLastName("");
    setPhoneNo("");
    setDateOfBirth("");
    setAddress("");
    console.log(
      firstName,
      lastName,
      phoneNo,
      dateOfBirth,
      address + " are the new data"
    );
  };

  let modal;
  const handleShowModal = () => {
    if (!modal) {
      let modalElement = document.querySelector(".main");
      modal = new Modal(modalElement);
    } else {
      let modalElement = document.querySelector(".main");
      modal = new Modal(modalElement);
    }
    modal.show();
  };

  const handleCloseModal = () => {
    if (modal) {
      modal.hide();
    } else {
      modal = new Modal(document.querySelector(".show"));
      modal.hide();
    }
  };

  let subModal;
  const subhandleShowModal = (firstName, lastName, phoneNo, dateOfBirth, address) => {
    if (!subModal) {
      let modalElement = document.querySelector(`.${firstName}`);
      subModal = new Modal(modalElement);
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNo(phoneNo);
      setDateOfBirth(dateOfBirth);
      setAddress(address);
    } else {
      setFirstName(firstName);
      setLastName(lastName);
      setPhoneNo(phoneNo);
      setDateOfBirth(dateOfBirth);
      setAddress(address);
    }
    subModal.show();
  };

  const subhandleCloseModal = (firstName) => {
    if (subModal) {
      subModal.hide();
    } else {
      subModal = new Modal(document.querySelector(`.${firstName}`));
      subModal.hide();
    }
  };

  const { loading, refetch: reload } = useQuery(LOAD_TABLE_DATA, {
    variables: { tableName: username },
    onCompleted: (data) => {
      console.log(data);
      setDataDisplayed(data);
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });

  let [addAddressInfo] = useMutation(ADD_USER_INFO, {
    onCompleted: (data) => {
      handleSuccess("submitted");
      reload().then((data) => {
        setDataDisplayed(data.data);
        handleCloseModal();
      });
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });

  let [editAddressInfo] = useMutation(EDIT_CURRENT_FEILD, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(`There is an error with the editing ${JSON.stringify(error, null, 2)}`);
    },
  });

  // Define your DELETE_USER_INFO mutation
  let [deleteAddressInfo] = useMutation(DELETE_USER_INFO, {
    onCompleted: (data) => {
      handleSuccess("Deleted");
      reload().then((data) => {
        setDataDisplayed(data.data);
      });
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });

  let handleSuccess = (message) => {
    alert(message);
  };

  let addUserFunction = async () => {
    if (username && firstName && lastName && phoneNo && dateOfBirth && address) {
      let tableName = username;
      console.log(
        firstName,
        lastName,
        typeof phoneNo,
        dateOfBirth,
        address,
        "and the username is " + username
      );
      // Before calling the mutation, check if dateOfBirth is a non-empty string
      if (typeof dateOfBirth === 'string' && dateOfBirth.trim() !== '') {
        console.log('I got into the function...')
        addAddressInfo({
          variables: {
            tableName: tableName,
            firstName: firstName,
            lastName: lastName,
            dateOfbirth: dateOfBirth,
            phoneNo: phoneNo.toString(),
            address: address,
          },
        });
      } else {
        alert("Date of birth must be a non-empty string");
      }

      console.log('the date of birth is ' + dateOfBirth)
      resetValue();
    } else {
      alert("empty field located");
    }
  };

  let updateUser = () => {
    // Use the useRef values to update the state
    const updatedFirstName = updateFirstNameRef.current.value;
    const updatedLastName = updateLastNameRef.current.value;
    const updatedPhoneNo = updatePhoneNoRef.current.value;
    const updatedDateOfBirth = updateDateOfBirthRef.current.value;
    const updatedAddress = updateAddressRef.current.value;

    // Here, you should use the id state to identify which row you are updating
    console.log(
      "Updated values:",
      id,
      updatedFirstName,
      updatedLastName,
      updatedPhoneNo,
      updatedDateOfBirth,
      updatedAddress
    );

    editAddressInfo({
      variables: {
        username: username, // Use the correct variable name
        id: id,
        updatedFirstName: updatedFirstName, // Use the correct variable name
        updatedLastName: updatedLastName, // Use the correct variable name
        updatedPhoneNo: updatedPhoneNo, // Use the correct variable name
        updatedDateOfBirth: updatedDateOfBirth, // Use the correct variable name
        updatedAddress: updatedAddress, // Use the correct variable name
      },
    });

    reload().then((data) => {
      setDataDisplayed(data.data);
      handleCloseModal();
    });
    resetValue();
  };

  // Function to handle deleting a user
  let handleDeleteUser = (itemId) => {
    deleteAddressInfo({
      variables: {
        tableName: username,
        id: itemId,
      },
    });
  };

  let navigateHandler = () => {
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>WELCOME {username.toUpperCase()}</h1>
      {dataDisplayed && dataDisplayed.getAddressInfo && dataDisplayed.getAddressInfo.length > 0 ? (
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
            {dataDisplayed.getAddressInfo.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phoneNo}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.address}</td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      subhandleShowModal(
                        item.firstName,
                        item.lastName,
                        item.phoneNo,
                        item.dateOfBirth,
                        item.address
                      );
                      setId(item.id);
                    }}
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>no data inputed</h2>
      )}

      <button className="btn btn-primary" onClick={() => handleShowModal()}>
        Add User
      </button>
      <button className="btn btn-primary" onClick={navigateHandler}>
        Log out
      </button>

      {/* Main Modal */}
      <div className={"modal fade main"} tabIndex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
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
                  onKeyPress={(event) => {
                    let last_char = event.key;
                    if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                      alert(`Invalid input "${last_char}"`);
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  value={firstName}
                />

                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Last Name"
                  onKeyPress={(event) => {
                    let last_char = event.key;
                    if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                      alert(`Invalid input "${last_char}"`);
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                  value={lastName}
                />
                <input
                  className="form-control mb-2"
                  type="number"
                  placeholder="Phone Number"
                  onKeyPress={(event) => {
                    let last_char = event.key;
                    if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                      alert(`Invalid input "${last_char}"`);
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => setPhoneNo(event.target.value)}
                  required
                  value={phoneNo}
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Date of Birth"
                  onKeyPress={(event) => {
                    let last_char = event.key;
                    if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                      alert(`Invalid input "${last_char}"`);
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  required
                  value={dateOfBirth}
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Address"
                  onKeyPress={(event) => {
                    let last_char = event.key;
                    if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                      alert(`Invalid input "${last_char}"`);
                      event.preventDefault();
                    }
                  }}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                  value={address}
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
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Sub-Modals */}
      {dataDisplayed &&
        dataDisplayed.getAddressInfo &&
        dataDisplayed.getAddressInfo.length > 0 &&
        dataDisplayed.getAddressInfo.map((item) => (
          <div
            className={`modal fade sub ${item.firstName}`}
            key={item.id}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="addUserModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addUserModalLabel">
                    Edit User
                  </h5>
                </div>
                <div className="modal-body">
                  {/* Form */}
                  <form className="form">
                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="First Name"
                      onKeyPress={(event) => {
                        let last_char = event.key;
                        if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                          alert(`Invalid input "${last_char}"`);
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                      }}
                      required
                      value={firstName.length === 0 ? item.firstName : firstName}
                      ref={updateFirstNameRef}
                    />

                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="Last Name"
                      onKeyPress={(event) => {
                        let last_char = event.key;
                        if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                          alert(`Invalid input "${last_char}"`);
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setLastName(event.target.value);
                      }}
                      required
                      value={lastName.length === 0 ? item.lastName : lastName}
                      ref={updateLastNameRef}
                    />
                    <input
                      className="form-control mb-2"
                      type="number"
                      placeholder="Phone Number"
                      onKeyPress={(event) => {
                        let last_char = event.key;
                        if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                          alert(`Invalid input "${last_char}"`);
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setPhoneNo(event.target.value);
                      }}
                      required
                      value={phoneNo.length === 0 ? item.phoneNo : phoneNo}
                      ref={updatePhoneNoRef}
                    />
                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="Date of Birth"
                      onKeyPress={(event) => {
                        let last_char = event.key;
                        if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                          alert(`Invalid input "${last_char}"`);
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setDateOfBirth(event.target.value);
                      }}
                      required
                      value={dateOfBirth ? item.dateOfBirth : dateOfBirth}
                      ref={updateDateOfBirthRef}
                    />
                    <input
                      className="form-control mb-2"
                      type="text"
                      placeholder="Address"
                      onKeyPress={(event) => {
                        let last_char = event.key;
                        if (last_char === " " || last_char === "-" || last_char === "!" || last_char === "$" || last_char === "_" || last_char === ".") {
                          alert(`Invalid input "${last_char}"`);
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      required
                      value={address.length === 0 ? item.address : address}
                      ref={updateAddressRef}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  {/* Submit Button */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateUser}
                  >
                    Update User
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      subhandleCloseModal(item.firstName);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
