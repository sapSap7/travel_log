import React from "react";
import { motion } from "framer-motion";
import "./LoginForm.css";

export default function LoginForm() {
  return (
    <div className="login-container">
      <motion.div
        className="login-box"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </motion.div>
    </div>
  );
}
