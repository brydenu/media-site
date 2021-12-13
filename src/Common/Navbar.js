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
    const userId = user ? user.username : "";

    // const testData = (evt) => {
    //     evt.preventDefault();
    //     console.log("current token: ", token);
    //     console.log("current user: ", user);
    //     console.log("current data: ", data);
    // };

    const handleLogout = () => {
        setToken("");
        setUser("");
        setRemember(false);
        localStorage.clear();
        navigate("/");
    };
    const loggedInNav = (
        <>
            <Link to={`/profile/${userId}`}>
                <p className="nav-option-btn">Profile</p>
            </Link>
            <div onClick={handleLogout} className="logout-btn">
                <p className="nav-option-btn right-end-btn">Logout</p>
            </div>
        </>
    );
    const loggedOutNav = (
        <>
            <Link to="/login">
                <p className="nav-option-btn">Login</p>
            </Link>
            <Link to="/signup">
                <p className="nav-option-btn right-end-btn">Sign up</p>
            </Link>
        </>
    );
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link to="/">Media Site</Link>
            </div>
            {/* <button className="test-button" onClick={testData}>
                Test Data (TESTING)
            </button> */}
            <Searchbar location="nav" />
            <div className="nav-options">
                <Link to="/">
                    <p className="nav-option-btn">Home</p>
                </Link>
                {user ? loggedInNav : loggedOutNav}
            </div>
        </div>
    );
}
