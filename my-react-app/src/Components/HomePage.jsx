import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [entries, setEntries] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentingEntryId, setCommentingEntryId] = useState(null);
  const navigate = useNavigate();

  // האם המשתמש מחובר? (יש token ב-localStorage)
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/all")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("שגיאה בטעינה:", err));
  }, []);

  const handleCommentSubmit = async (e, entryId) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${entryId}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCommentFromServer = res.data;

      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === entryId
            ? {
                ...entry,
                comments: [...(entry.comments || []), newCommentFromServer],
              }
            : entry
        )
      );

      setNewComment("");
      setCommentingEntryId(null);
    } catch (error) {
      console.error("שגיאה בשליחת תגובה", error);
    }
  };

  return (
    <div className="homepage">
      <header
        style={{
          width: "100%",
          maxWidth: 600,
          marginBottom: 20,
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="button--primary"
            >
              התחבר
            </button>
            <button
              onClick={() => navigate("/register")}
              className="button-secondary"
            >
              הרשמה
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/home")}
              className="button--primary"
              title="עבור לעמוד הבית שלך"
            >
              הבית שלי
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="button-secondary"
            >
              התנתק
            </button>
          </>
        )}
      </header>

      <h1>יומן מסע ציבורי</h1>

      {entries.length === 0 ? (
        <p>אין רשומות להצגה</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id} className="discussion">
            <div className="discussion_icons">
              <div>{/* איקון SVG */}</div>
              <div className="discussion_icons_settings">{/* הגדרות */}</div>
            </div>

            <div className="discussion_header">
              <div className="authed-user">
                <strong>{entry.user?.username || "משתמש לא ידוע"}</strong>
              </div>

              {isLoggedIn ? (
                <form onSubmit={(e) => handleCommentSubmit(e, entry._id)}>
                  <textarea
                    cols="150"
                    rows="4"
                    placeholder="כתוב תגובה..."
                    value={commentingEntryId === entry._id ? newComment : ""}
                    onChange={(e) => {
                      setCommentingEntryId(entry._id);
                      setNewComment(e.target.value);
                    }}
                  ></textarea>
                  <div className="newcomment_toolbar">
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => setNewComment("")}
                    >
                      איפוס
                    </button>
                    <button type="submit" className="button--primary">
                      תגובה
                    </button>
                  </div>
                </form>
              ) : (
                <p>
                  <Link to="/login">התחבר</Link> כדי להוסיף תגובה
                </p>
              )}
            </div>

            <div className="discussion_comments">
              <div className="entry-card">
                <h3>{entry.title}</h3>
                <p>{new Date(entry.date).toLocaleDateString()}</p>
                <p>{entry.location}</p>
                <p>{entry.description?.slice(0, 100)}...</p>
                <Link to={`/trip/${entry._id}`}>קרא עוד</Link>
              </div>

              {/* הצגת תגובות */}
              {entry.comments && entry.comments.length > 0 ? (
                entry.comments.map((comment, i) => (
                  <div key={i} className="comment">
                    <p>
                      <strong>{comment.user?.username || "משתמש"}</strong>:{" "}
                      {comment.text}
                    </p>
                    <small>
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
              ) : (
                <p>אין תגובות</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
