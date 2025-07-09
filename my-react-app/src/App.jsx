import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import UserLogs from "./Components/UserLogs";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showLogin ? (
              <LoginForm onSwitch={() => setShowLogin(false)} />
            ) : (
              <SignUp onSwitch={() => setShowLogin(true)} />
            )
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/api/logs" element={<UserLogs />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
