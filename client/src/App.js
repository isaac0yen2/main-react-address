import React from 'react';
import Loginpage from './components/LoginPage';
import Signup from './components/Signup';
import Forgotpassword from './components/Forgotpassword';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"




function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Loginpage />}></Route>
      </Routes>
    </Router>

    <Router>
    <Routes>
      <Route exact path="/sign-up" element={<Signup />}></Route>
    </Routes>
  </Router>

  <Router>
    <Routes>
      <Route exact path="/forgot-password" element={<Forgotpassword />}></Route>
    </Routes>
  </Router>
  </>
    );
}

export default App;
