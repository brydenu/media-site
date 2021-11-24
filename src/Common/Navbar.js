import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <p className="logo">Media Site</p>
            </div>
            <div className="nav-options">
                <Link to="/">Home</Link>
                <Link to="/show">Show</Link>
                <Link to="/movie">Movie</Link>
                <Link to="/song">Song</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}

// Put a searchbar in the navbar!
