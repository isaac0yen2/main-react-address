import React, { useState } from "react";

let Signup = ()=>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(username, email, password);
    };

    return(
        <div className="container">
  <div className="row">



    <div className="col-md-12">
      <h1 className="text-center">Sign up</h1>


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
          <label for="Email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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


        <button type="submit" className="btn btn-primary">Sign up</button>



      </form>
    </div>
  </div>
</div>

    )
}

export default Signup;