import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRequireAuth } from "./ProtectedRoute";
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
        console.log("API Response:", res.data);
        setTrips(res.data);
      })

      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="trips-container">
      <h1>הטיולים שלי</h1>
      <Link to="/Home" className="btn">
        + הוסף טיול חדש
      </Link>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id} className="trip-card">
            <h3>{trip.title}</h3>
            <p>
              <strong>תאריך:</strong> {new Date(trip.date).toLocaleDateString()}
            </p>
            <p>
              <strong>מיקום:</strong> {trip.location}
            </p>
            <img src={trip.imageUrl} alt="Trip" style={{ width: "200px" }} />
            <p>{trip.content}</p>
            <div>
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
          </li>
        ))}
      </ul>
    </div>
  );

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
}
