import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {ADD_USER_INFO} from "../graphQL/Mutations";
import { LOAD_TABLE_DATA } from "../graphQL/Queries";
import { UserContext } from "../UserContext";
import { Modal } from "bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { username } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfbirth, setdateOfbirth] = useState("");
  const [address, setAddress] = useState("");
  const [dataDisplayed, setDataDisplayed] = useState(null);
  const navigate = useNavigate();

  let resetValue = () => {
    setFirstName("");
    setLastName("");
    setPhoneNo("");
    setdateOfbirth("");
    setAddress("");
    console.log(
      firstName,
      lastName,
      phoneNo,
      dateOfbirth,
      address + " are the new data"
    );
  };
  
  let modal;
  const handleShowModal = () => {
    if (!modal) {
      let modalElement = document.querySelector(".main");
      modal = new Modal(modalElement);
    }else{
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
  let subModal
  const subhandleShowModal = (indetifier) => {
    if (!subModal) {
      let modalElement = document.querySelector(`.${indetifier}`);
      subModal = new Modal(modalElement);
    }else{
      let modalElement = document.querySelector(`.${indetifier}`);
      subModal = new Modal(modalElement);
    }
    subModal.show();
  };
  const subhandleCloseModal = () => {
    if (subModal) {
      subModal.hide();
    } else {
      subModal = new Modal(document.querySelector());
      subModal.hide();
    }
  };

  
  
  const { loading, refetch:reload } = useQuery(LOAD_TABLE_DATA, {
    variables: { tableName: username },
    onCompleted: (data) => {
      console.log(data)
      setDataDisplayed(data)
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });



  let [addAddressInfo] = useMutation(ADD_USER_INFO, {
    onCompleted: (data) => {
      handleSuccess("submitted");
      console.log(reload())
      reload().then(  (data)=>{
        setDataDisplayed(data.data)
        handleCloseModal()
      })
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });



  let handleSuccess = (message) => {

    alert(message);  

};

  let addUserFunction = async () => {



    if (
      username && firstName && lastName && phoneNo && dateOfbirth && address
    ) {
      let tableName = username;
      console.log(
        firstName, lastName, typeof(phoneNo), dateOfbirth, address,
        "and the username is " + username
      );
      addAddressInfo({
        variables: {
          tableName: tableName,
          firstName: firstName,
          lastName: lastName,
          phoneNo: phoneNo.toString(),
          dateOfbirth: dateOfbirth,
          address: address,
        },
      });
      resetValue()
    } else {

      alert("empty feild located");

    }
  };

  let navigateHandler = ()=>{
    navigate('/')
  }

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
<>
     
            <div
        className={`modal fade sub ${item.firstName}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
      <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addUserModalLabel">
                    
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
            value={
              firstName.length === 0 ? (item.firstName):firstName
            }
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
                  value={
                    lastName.length === 0 ? (item.lastName):lastName
                  }
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
                  value={
                    phoneNo.length === 0 ? (item.phoneNo):phoneNo
                  }
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
                  onChange={(event) => setdateOfbirth(event.target.value)}
                  required
                  value={
                    dateOfbirth.length === 0 ? (item.dateOfbirth):dateOfbirth
                  }                />
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
                  value={
                    address.length === 0 ? (item.address):address
                  }  
                      />
              </form>



                    <button className="btn btn-danger" onClick={subhandleCloseModal}>ADD USER</button>

                  </h5>
                </div>
                </div>
                </div> 
                </div>


  <tr key={uuidv4()}>
    <td key={uuidv4()}>{item.firstName}</td>
    <td key={uuidv4()}>{item.lastName}</td>
    <td key={uuidv4()}>{item.phoneNo}</td>
    <td key={uuidv4()}>{item.dateOfbirth}</td>
    <td key={uuidv4()}>{item.address}</td>
    <td>
      <button className="btn btn-primary mr-2" onClick={()=>{
        subhandleShowModal(item.firstName)
      }}>Edit</button>
      <button className="btn btn-danger">Delete</button>
    </td>
  </tr>
  
</>
))}

    </tbody>
  </table>
) : (
  <h2>no data inputed</h2>
)}

      





      <button className="btn btn-primary" onClick={handleShowModal}>
        Add User
      </button>
      <button className="btn btn-primary" onClick={navigateHandler}>
        Log out
      </button>



      {/* Modal */}
      <div
        className={"modal fade main"}
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
                  onChange={(event) => setdateOfbirth(event.target.value)}
                  required
                  value={dateOfbirth}
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
