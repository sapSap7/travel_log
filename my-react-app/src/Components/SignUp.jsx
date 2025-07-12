import React, { useRef, useEffect, useState } from "react";
import "./LoginForm.css"; // עדיין משתמש ב-CSS משותף
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SignUp({ onSwitch }) {
  const modalRef = useRef(null);
  const scrollDownRef = useRef(null);
  let isOpened = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("is-open");
      document.body.style.overflow = "initial";
    }
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened.current) {
        isOpened.current = true;
        if (scrollDownRef.current) scrollDownRef.current.style.display = "none";
        openModal();
      }
    };

    window.addEventListener("scroll", onScroll);
    document.onkeydown = (evt) => {
      if ((evt || window.event).key === "Escape") {
        closeModal();
      }
    };

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setError(null);
      toast.success("SignUp successful!");
      setTimeout(() => {
        window.location.href = "/Home";
      }, 2000);
    } catch {
      setError("Server error");
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      toast.success("Signed up with Google successfully!");
      setTimeout(() => {
        window.location.href = "/Home";
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Google Sign-Up failed");
    }
  };

  return (
    <>
      {window.location.pathname === "/login" && <div className="container" />}
      <div className="scroll-down" ref={scrollDownRef}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"></svg>
      </div>

      <div className="modal" ref={modalRef}>
        <div className="modal-container">
          <div className="modal-left">
            <div className="modal-content-wrapper">
              <h1 className="modal-title">Join Us!</h1>
              <p className="modal-desc">
                Create a new account to start your journey
              </p>

              <form onSubmit={handleSubmit}>
                <div className="input-block">
                  <label htmlFor="email" className="input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-block">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="input-block">
                  <label htmlFor="confirm-password" className="input-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="modal-buttons">
                  <button type="submit" className="input-button">
                    Sign Up
                  </button>
                </div>
              </form>

              <button
                onClick={handleGoogleSignUp}
                className="google-auth-button google-bottom"
              >
                <FontAwesomeIcon icon={faGoogle} />
                Sign Up with Google
              </button>

              <p className="sign-up">
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitch();
                  }}
                >
                  Login here
                </a>
              </p>
            </div>
          </div>

          <div className="modal-right">
            <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&auto=format&fit=crop&w=1000&q=80"
              alt="Sign Up"
            />
          </div>

          <button className="icon-button close-button" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
              <path d="M25 3C12.9 3 3 12.9 3 25s9.9 22 22 22 22-9.9 22-22S37.1 3 25 3zm0 2c11.05 0 20 8.95 20 20s-8.95 20-20 20S5 36.05 5 25 13.95 5 25 5zm-8 11.99a1 1 0 00-.71 1.71L23.59 25l-7.3 7.3a1 1 0 101.41 1.41L25 26.41l7.3 7.3a1 1 0 101.41-1.41L26.41 25l7.3-7.3a1 1 0 10-1.41-1.41L25 23.59l-7.3-7.3a1 1 0 00-.7-.3z" />
            </svg>
          </button>
        </div>

        <button className="modal-button" onClick={openModal}>
          Click here to sign up
        </button>
      </div>
    </>
  );
}
