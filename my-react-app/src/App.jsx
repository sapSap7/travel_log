import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import UserLogs from "./Components/UserLogs";
import Trips from "./Components/Trips";
import TripDetails from "./Components/TripDetails";
import EditTrip from "./Components/EditTrip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Components/HomePage";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            showLogin ? (
              <LoginForm onSwitch={() => setShowLogin(false)} />
            ) : (
              <SignUp onSwitch={() => setShowLogin(true)} />
            )
          }
          className="login-form"
        />
        <Route path="/trips" element={<Trips />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logs" element={<UserLogs />} />

        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
