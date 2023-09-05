import React , { useState } from "react";

let Forgotpassword = ()=>{
const [email, setEmail] = useState("");

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(email);
};

return(   
    <div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="forgot-password-form">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div> 
        <p>
            Don't have an account?
          <a href="/sign-up" className="p-1">sign up</a>
        </p>
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
        {/* after submiting...the user should be redirected back to the login page */}

      </div>
    </div>
  </div>
</div>)

}

export default Forgotpassword;