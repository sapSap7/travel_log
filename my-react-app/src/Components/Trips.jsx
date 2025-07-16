import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRequireAuth } from "./ProtectedRoute";
import "./Trips.css";

export default function Trips() {
  useRequireAuth();
  const [trips, setTrips] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/entries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTrips(res.data);
      })
      .catch((err) => console.error(err));
  }, [token]);

  function randomRotate() {
    const deg = Math.random() * 4 - 2;
    return `rotate(${deg}deg)`;
  }

  function handleDelete(id) {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הרשומה?")) {
      axios
        .delete(`/api/entries/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setTrips(trips.filter((t) => t._id !== id)))
        .catch((err) => console.error(err));
    }
  }

  return (
    <div className="trips-wrapper">
      <h1 className="trips-title">הטיולים שלי</h1>
      <div className="trips-container">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="trip-card"
            style={{ transform: randomRotate() }}
          >
            <img
              src={trip.photoUrl || "/backgroundTrip.jpg"}
              alt={trip.title}
            />
            <h3>{trip.title}</h3>
            <p>
              <strong>📍 {trip.location}</strong>
            </p>
            <p>{trip.description?.slice(0, 80)}...</p>
            <p>
              <strong>📅 {new Date(trip.date).toLocaleDateString()}</strong>
            </p>
            <div className="trip-buttons">
              <Link to={`/trip/${trip._id}`} className="btn">
                צפייה
              </Link>
              <Link to={`/edit-trip/${trip._id}`} className="btn">
                עריכה
              </Link>
              <button onClick={() => handleDelete(trip._id)} className="btn">
                מחיקה
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
