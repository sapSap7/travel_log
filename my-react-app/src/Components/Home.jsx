import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import JournalEntryForm from "./JournalEntryForm";
import { useRequireAuth } from "./ProtectedRoute";
import "./Home.css";

export default function Home() {
  useRequireAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.name) {
      setUserName(userData.name);
    } else if (userData?.email) {
      setUserName(userData.email.split("@")[0]);
    }
  }, []);

  const goToTrips = () => {
    navigate("/trips");
  };

  return (
    <div className="home-background">
      <div className="home-container">
        <h1>Welcome {userName ? `, &{userName}!` : "!"}</h1>
        <button onClick={goToTrips}>See My Trips</button>
        <JournalEntryForm />
        <LogOutButton />
      </div>
    </div>
  );
}
