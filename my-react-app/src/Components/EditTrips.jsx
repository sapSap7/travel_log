import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./EditTrips.css";

export default function EditTrips() {
  const { id } = useParams();
  const [tripData, setTripData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    photoUrl: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { title, date, location, description, photoUrl } = res.data;
        setTripData({
          title,
          date: date ? new Date(date).toISOString().slice(0, 10) : "",
          location,
          description,
          photoUrl,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "שגיאה",
          text: "שגיאה בטעינת הטיול לעריכה",
        });
      });
  }, [id, token]);

  function handleChange(e) {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/entries/${id}`, tripData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "בוצע",
          text: "טיול עודכן בהצלחה",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(`/trip/${id}`);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "שגיאה",
          text: "שגיאה בעדכון הטיול",
        });
      });
  }

  return (
    <div className="log-form-wrapper">
      <div className="log-form">
        <h2>עריכת טיול</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="title"
            type="text"
            name="title"
            value={tripData.title}
            onChange={handleChange}
            placeholder="כותרת"
            required
          />

          <input
            className="date"
            type="date"
            name="date"
            value={tripData.date}
            onChange={handleChange}
            required
          />
          <input
            className="location"
            type="text"
            name="location"
            value={tripData.location}
            onChange={handleChange}
            placeholder="מיקום"
          />
          <textarea
            className="desc"
            name="description"
            value={tripData.description}
            onChange={handleChange}
            placeholder="תיאור"
            rows="4"
          />
          <input
            className="photoURL"
            type="text"
            name="photoUrl"
            value={tripData.photoUrl}
            onChange={handleChange}
            placeholder="קישור לתמונה"
          />

          {tripData.photoUrl && (
            <div style={{ marginTop: "1rem", position: "relative" }}>
              <img
                src={tripData.photoUrl}
                alt="תצוגה מקדימה"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <button
                type="button"
                onClick={() => setTripData({ ...tripData, photoUrl: "" })}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                מחק
              </button>
            </div>
          )}

          <button type="submit">שמור שינויים</button>
        </form>
      </div>
    </div>
  );
}
