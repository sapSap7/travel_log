import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTrip(res.data))
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "info",
          title: "שימו לב",
          text: "כדי לצפות או לערוך יש להתחבר לחשבון",
          confirmButtonText: "אוקיי",
        });
      });
  }, [id, token]);

  if (!trip) return <div>טוען...</div>;

  return (
    <div className="trip-details">
      <h1>{trip.title}</h1>
      <p>
        <strong>תאריך:</strong> {new Date(trip.date).toLocaleDateString()}
      </p>
      <p>
        <strong>מיקום:</strong> {trip.location}
      </p>
      {trip.photoUrl && (
        <img src={trip.photoUrl} alt="Trip" style={{ width: "300px" }} />
      )}
      <p>{trip.description}</p>
      <button onClick={() => navigate("/trips")}>חזור לרשימה</button>
      <Link to={`/edit-trip/${trip._id}`} className="btn">
        ערוך
      </Link>
    </div>
  );
}
