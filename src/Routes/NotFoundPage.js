import React from "react";
import { Link } from "react-router-dom";
import Card from "../Common/Card";
import "../Styles/NotFoundPage.css";

export default function NotFoundPage() {
    const headerContent = (
        <h1 className="404-title">404... We couldn't find that.</h1>
    );
    const bodyContent = (
        <>
            <p>We couldn't find the page you requested.</p>
            <p>
                If you are looking for a specific movie, show, or song, make
                sure you have the correct id.
            </p>
            <Link to="/">Click here to go to the homepage.</Link>
        </>
    );

    return <Card header={headerContent} body={bodyContent} cardClass="404" />;
}
