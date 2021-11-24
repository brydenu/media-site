import React from "react";
import "../Styles/Card.css";

export default function Card({ header, body, type }) {
    return (
        <div className={"card " + type}>
            <div className="card-header">{header}</div>
            <div className="card-body">{body}</div>
        </div>
    );
}
