import React, { useState, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { Load_login_info } from "../graphQL/Queries";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername } = useContext(UserContext);

  const [getLoginInfo, { loading}] = useLazyQuery(Load_login_info);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length > 0) {
        try {
            const result = await getLoginInfo({ variables: { username } });
            const data = result.data;
            if (data && data.getLoginInfo.password === password) {
                setGlobalUsername(username);
                navigate("/dashboard");
            }else{
              alert("Invalid username or password");
            }
        } catch (error) {
            console.log(error)
        }
    }
}


  return (
    <div className="container">
      {loading && handleSubmit}
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
                onChange={(event) => setUsername(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <p>
              Don't have an account?
              <a href="/sign-up" className="p-1">
                Sign up
              </a>
            </p>
            <p>
              Forgot password?
              <a href="/forgot-password" className="p-1">
                Forgot password
              </a>
            </p>
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
