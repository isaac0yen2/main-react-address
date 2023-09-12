import React, {useContext } from "react";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Load_login_info } from "../graphQL/Queries";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername } = useContext(UserContext);
  const [validation , setvalidation] = useState()

  const [getLoginInfo, { loading}] = useLazyQuery(Load_login_info);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length > 0) {
        try {
            const result = await getLoginInfo({ variables: { username } });
            const data = result.data
            console.log(data.getLoginInfo)
            if (data.getLoginInfo && data.getLoginInfo.password === password) {
                setGlobalUsername(username);
                navigate("/dashboard");
            }else if(data.getLoginInfo == null || data.getLoginInfo.password !== password){
              setvalidation(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
}


  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {validation&&  <p style={
        {textAlign:"center",color:"red"}
      }>Please check your information and try again...</p> }
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="form-control"
                value={username}
                onChange={(event) =>{
                  setUsername(event.target.value)
                  setvalidation(false)
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-control"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setvalidation(false)
                }}
                required
              />
            </div>
            {validation ? (
              <p style={{
                color:"red"
              }}>
              Don't have an account?
              <a href="/sign-up" className="p-1">
                Sign up
              </a>
            </p>
            ):(
              <p>
              Don't have an account?
              <a href="/sign-up" className="p-1">
                Sign up
              </a>
            </p>
            )}
            { validation? (
              <p style={{
                color:"red"
              }}>
              Forgot password?
              <a href="/forgot-password" className="p-1">
                Forgot password
              </a>
            </p>
            ):(
              <p>
              Forgot password?
              <a href="/forgot-password" className="p-1">
                Forgot password
              </a>
            </p>
            )

            }
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
