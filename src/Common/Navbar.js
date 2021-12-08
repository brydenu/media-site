import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import AppContext from "../Helpers/Context";
import "../Styles/Navbar.css";

export default function Navbar() {
    const { token, setToken } = useContext(AppContext).tokenState;
    const { user, setUser } = useContext(AppContext).userState;
    const { data } = useContext(AppContext).dataState;
    const { setRemember } = useContext(AppContext).rememberState;
    const navigate = useNavigate("");

    const testData = (evt) => {
        evt.preventDefault();
        console.log("current token: ", token);
        console.log("current user: ", user);
        console.log("current data: ", data);
    };

    const handleLogout = () => {
        setToken("");
        setUser("");
        setRemember(false);
        localStorage.clear();
        navigate("/");
    };
    const loggedInNav = (
        <>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <p onClick={handleLogout} className="logout-btn">
                Logout
            </p>
        </>
    );
    const loggedOutNav = (
        <>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
        </>
    );
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link to="/">Media Site</Link>
            </div>
            <button className="test-button" onClick={testData}>
                Test Data (TESTING)
            </button>
            <Searchbar location="nav" />
            <div className="nav-options">
                {token ? loggedInNav : loggedOutNav}
            </div>
        </div>
    );
}
