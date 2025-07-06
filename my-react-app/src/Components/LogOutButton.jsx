import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOutButton() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <button onClick={handleLogOut} style={{ margin: "10px" }}>
      Log Out
    </button>
  );
}
