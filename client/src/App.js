import React from 'react';
import Loginpage from './components/LoginPage';
import Signup from './components/Signup';
import Forgotpassword from './components/Forgotpassword';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './UserContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Loginpage />}></Route>
            <Route exact path="/sign-up" element={<Signup />}></Route>
            <Route exact path="/forgot-password" element={<Forgotpassword />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
