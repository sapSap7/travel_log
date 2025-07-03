import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignupPage from "./auth/SignUpPage";

function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Travel Log</h1>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
