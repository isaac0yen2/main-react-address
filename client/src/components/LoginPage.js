import React, { useState } from "react";
import {useQuery} from "@apollo/client"
import {Load_login_info} from "../graphQL/Queries"


const LoginPage = () => {

  let {error,loading, data } = useQuery(Load_login_info, {
    variables: { username: "isaac" },
  });
  
  useState(() => {
    if (loading) {
     console.log("loading...")
     alert('loading...')
    }else if(data){
       console.log(data)
       alert("data")
    }else if(error){
      console.log`there is an error${error}`
    }
  }, [data, loading ,error]);
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Username:", username);
      console.log("Password:", password);
    };
  
    return (
<div className="container">
  <div className="row">
    <div className="col-md-12">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
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
          Don't have an account?
          <a href="/sign-up" className="p-1">Sign up</a>
        </p>
        <p>
          Forgot password?
          <a href="forgot-password" className="p-1">Forgot password</a>
        </p>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</div>

    );
  };
  
  export default LoginPage;
