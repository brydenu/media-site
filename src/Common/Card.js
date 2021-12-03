import React from "react";
import "../Styles/Card.css";

export default function Card({ header, body, cardClass }) {
    return (
        <div className={"card " + cardClass}>
            <div className="card-header">{header}</div>
            <div className="card-body">{body}</div>
        </div>
    );
}
