import React from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import JournalEntryForm from "./JournalEntryForm";
import UserLogs from "./UserLogs";

export default function Home() {
  const navigate = useNavigate();

  const goToCalendar = () => {
    // נניח שהיומן שלך נמצא בנתיב /calendar
    navigate("/logs");
  };

  return (
    <div>
      <h1>Welcome to Home</h1>
      <button onClick={goToCalendar}>Go to personal logs</button>
      <LogOutButton />
      <JournalEntryForm />
    </div>
  );
}
