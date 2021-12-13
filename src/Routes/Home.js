import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import Searchbar from "../Common/Searchbar";
import "../Styles/Home.css";

/**
 * The home page.
 *
 * Shows just a search bar when logged in.
 *
 * If not logged in, will show extra buttons to sign up or login.
 */
export default function Home() {
    const { user } = useContext(AppContext).userState;
    const headerContent = (
        <>
            <h1 className="home-title">Welcome to the Media Site!</h1>
            <Searchbar location="home" />
        </>
    );
    const bodyContent = (
        <div
            className={
                user
                    ? "hidden-home-btns home-body"
                    : "showing-home-btns home-body"
            }
        >
            <h3 className="home-or">or</h3>
            <div className="home-buttons">
                <p>
                    <Link to="/login" className="home-link">
                        Log in
                    </Link>
                    or
                    <Link to="signup" className="home-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );

    return (
        <div className="main main-home">
            <Card header={headerContent} body={bodyContent} cardClass="home" />
        </div>
    );
}
