import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-brand">Fitness Tracker</h2>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/workouts" className="nav-link">Workouts</Link>
        <Link to="/schedule" className="nav-link">Schedule</Link>
        <Link to="/progress" className="nav-link">Progress</Link>
        <Link to="/diet" className="nav-link">Diet</Link>
        <Link to="/statistics" className="nav-link">Statistics</Link>
      </div>
    </nav>
  );
};

export default Navbar;