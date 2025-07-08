// navigate from /calender
// show user's logs

import React, { useState, useEffect } from "react";
//import Router from "react-router-dom";
import LogOutButton from "./LogOutButton";
import { useNavigate } from "react-router-dom";
import "./UserLogs.css";

export default function UserLogs() {
  const home = useNavigate("/");
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/logs", {
          headers: {
            Authorization: `Bearer &{token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch logs");
        }

        const data = await res.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLogs();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="logs-list">
      <h2>My Travel Logs</h2>
      {logs.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        logs.map((log) => (
          <div key={log._id} className="log-entry">
            <h3>{log.title}</h3>
            <p>
              <strong>Location:</strong> {log.location}
            </p>
            <p>
              <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}
            </p>
            <p>{log.description}</p>
            {log.photoUrl && (
              <img
                src={log.photoUrl}
                alt="log"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            )}
            <hr />
          </div>
        ))
      )}
      <LogOutButton />
    </div>
  );
}
