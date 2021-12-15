import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import AppContext from "../Helpers/Context";
import "../Styles/Navbar.css";

/**
 * The interactive Navbar. Side options change depending on logged in status.
 *
 * Can be used to search from any page on the site.
 *
 * JWT support can be included with a few updates.
 */
export default function Navbar() {
    // const { token, setToken } = useContext(AppContext).tokenState;
    const { user, setUser } = useContext(AppContext).userState;
    const { setRemember } = useContext(AppContext).rememberState;
    const navigate = useNavigate("");
    const userId = user ? user.username : "";

    /**
     * handleLogout: Clears all relevant pieces of state and clears local storage. Redirects user to home page.
     */

    const handleLogout = () => {
        // setToken("");
        setUser("");
        setRemember(false);
        localStorage.clear();
        navigate("/");
    };

    /**
     * Logged-in specific options include the logout button, and the profile button
     * that lets a user check out history and update info.
     */
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

    /**
     * Logged-out specific options include a login and sign up button.
     */
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
