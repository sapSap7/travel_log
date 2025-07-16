import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [entries, setEntries] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentingEntryId, setCommentingEntryId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/all")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error("Error loading entries", err));
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
      console.error("Error submitting comment", error);
    }
  };

  return (
    <div className="home-page-background">
      <div className="homepage">
        <header className="homepage-header">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="button--primary"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="button-secondary"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/home")}
                className="button--primary"
                title="Go to your private homepage"
              >
                My Home
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="button-secondary"
              >
                Logout
              </button>
            </>
          )}
        </header>

        <h1>Public Travel Journal</h1>

        {entries.length === 0 ? (
          <p>No trips to display.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} className="discussion">
              <div className="entry-card">
                <h3>{entry.title}</h3>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(entry.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {entry.location}
                </p>
                <p>{entry.description?.slice(0, 100)}...</p>
                <Link to={`/trip/${entry._id}`}>Read more</Link>
              </div>

              <div className="discussion_comments">
                <h4>Comments</h4>
                {entry.comments && entry.comments.length > 0 ? (
                  entry.comments.map((comment, i) => (
                    <div key={i} className="comment">
                      <p>
                        <strong>
                          {comment.user?.username || "Anonymous"}:
                        </strong>{" "}
                        {comment.text}
                      </p>
                      <small>
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}

                {isLoggedIn && (
                  <form onSubmit={(e) => handleCommentSubmit(e, entry._id)}>
                    <textarea
                      placeholder="Write a comment..."
                      value={commentingEntryId === entry._id ? newComment : ""}
                      onChange={(e) => {
                        setCommentingEntryId(entry._id);
                        setNewComment(e.target.value);
                      }}
                    />
                    <div className="newcomment_toolbar">
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={() => setNewComment("")}
                      >
                        Clear
                      </button>
                      <button type="submit" className="button--primary">
                        Submit
                      </button>
                    </div>
                  </form>
                )}

                {!isLoggedIn && (
                  <p>
                    <Link to="/login">Login</Link> to add a comment.
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
