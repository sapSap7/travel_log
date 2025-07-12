import React from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import JournalEntryForm from "./JournalEntryForm";
import { useRequireAuth } from "./ProtectedRoute";
export default function Home() {
  useRequireAuth();
  const navigate = useNavigate();

  const goToLogs = () => {
    navigate("/logs");
  };

  const goToTrips = () => {
    navigate("/trips");
  };

  return (
    <div>
      <h1>Welcome to Home</h1>

      <button onClick={goToLogs}>Go to personal logs</button>
      <button onClick={goToTrips}>See My Trips</button>

      <JournalEntryForm />
      <LogOutButton />
    </div>
  );
}
