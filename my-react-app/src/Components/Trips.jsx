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
    <>
      <style>{`
        .trips-container {
          max-width: 900px;
          margin: 60px auto;
          padding: 32px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .trips-container h1 {
          font-size: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #2d3748;
          margin-bottom: 32px;
        }

        .btn {
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          background-color: #3182ce;
          color: #ffffff;
          padding: 10px 18px;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .btn:hover {
          background-color: #2563eb;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        .trip-card {
          background-color: #f9f9f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .trip-card h3 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #2b6cb0;
          margin-bottom: 12px;
        }

        .trip-card p {
          font-size: 1rem;
          color: #4a5568;
          margin: 6px 0;
        }

        .trip-card img {
          margin-top: 10px;
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

        .trip-card div {
          margin-top: 12px;
        }

        .trips-container > a:last-child {
          display: block;
          margin-top: 30px;
          text-align: center;
          font-weight: 500;
          color: #4d78c9;
        }

        .trips-container > a:last-child:hover {
          color: #2b6cb0;
        }
      `}</style>
      <div className="trips-container">
        <h1>My Trips</h1>
        <Link to="/Home" className="btn">
          + Add New Trip
        </Link>
        <ul>
          {trips.map((trip) => (
            <li key={trip._id} className="trip-card">
              <h3>{trip.title}</h3>
              <p>
                <strong>תאריך:</strong>{" "}
                {new Date(trip.date).toLocaleDateString()}
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
        <Link to="/">Home</Link>
      </div>
    </>
  );
}
