import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import  REGISTER_NEW_USER  from "../graphQL/Mutations";
import { useNavigate } from "react-router-dom";





let Signup = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let [registrar , {loading, error}] = useMutation(REGISTER_NEW_USER)


    let registrationFunction = (username,password)=>{

      registrar({
        variables:{
          username: username,
          password: password
        }
      })
      navigate('/')
    }
    

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(username, password);
      registrationFunction(username,password);
    };
    if (loading) return 'loading...'
    if (error) return error
    return(
        <div className="container">
  <div className="row">



    <div className="col-md-12">
      <h1 className="text-center">Sign up</h1>


      <form >


        <div className="mb-3">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>



        <p>
          Already have an account?
          <a href="/" className="p-1">Log in</a>
        </p>


        <button onClick={handleSubmit} className="btn btn-primary">Sign up</button>



      </form>
    </div>
  </div>
</div>

    )
}

export default Signup;