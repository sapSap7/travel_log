import { useState } from "react";
import "./JournalEntryForm.css";
import MapDisplay from "./MapDisplay";

export default function JournalEntryForm() {
  const [formData, setFormData] = useState({
    location: "",
    title: "",
    date: "",
    description: "",
    photoUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return setMessage("Please log in first.");

    try {
      const res = await fetch("http://localhost:5000/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔐 send the token!
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Log added!");
        setFormData({
          location: "",
          title: "",
          date: "",
          description: "",
          photoUrl: "",
        });
      } else {
        setMessage(data.message || "Failed to add log.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();
    setSuggestions(data.slice(0, 5)); // Top 5 results
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (place) => {
    setFormData({ ...formData, location: place.display_name });
    setCoordinates({ lat: place.lat, lon: place.lon });
    setSuggestions([]);
  };

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    setUploading(true);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setFormData({ ...formData, photoUrl: data.url });
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="log-form" style={{ padding: 20 }}>
      <h2>Add New Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="location"
          name="location"
          value={formData.location}
          onChange={handleLocationChange}
          placeholder="Location"
          required
        />
        <ul className="suggestions">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSuggestionClick(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
        <br />
        <br />
        <input
          className="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <br />
        <input
          className="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <textarea
          className="desc"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          required
        />
        <br />
        <br />
        <input
          className="photoURL"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          placeholder="Photo URL (optional)"
        />
        <br />
        <br />
        <button type="submit">Add Log</button>
      </form>
      <MapDisplay coordinates={coordinates} />

      {message && <p>{message}</p>}
    </div>
  );
}
