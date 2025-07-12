import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTrip() {
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
    axios;
    axios
      .get(`http://localhost:5000/api/entries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // המרה לפורמט שמתאים לשדות הטופס, למשל תאריך בפורמט yyyy-mm-dd
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
        alert("שגיאה בטעינת הטיול לעריכה");
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
        alert("טיול עודכן בהצלחה");
        navigate(`/trip/${id}`);
      })
      .catch((err) => {
        console.error(err);
        alert("שגיאה בעדכון הטיול");
      });
  }

  return (
    <div className="edit-trip">
      <h1>ערוך טיול</h1>
      <form onSubmit={handleSubmit}>
        <label>
          כותרת:
          <input
            type="text"
            name="title"
            value={tripData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          תאריך:
          <input
            type="date"
            name="date"
            value={tripData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          מיקום:
          <input
            type="text"
            name="location"
            value={tripData.location}
            onChange={handleChange}
          />
        </label>

        <label>
          תיאור:
          <textarea
            name="description"
            value={tripData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          קישור לתמונה:
          <input
            type="text"
            name="photoUrl"
            value={tripData.photoUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit">שמור שינויים</button>
      </form>
    </div>
  );
}
