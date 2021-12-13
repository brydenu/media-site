import React from "react";
import "../Styles/Card.css";

export default function Card({
    header,
    body,
    cardClass,
    headerClass = "",
    cardKey = "",
}) {
    return (
        <div className={"card-wrapper " + cardClass} key={cardKey}>
            <div className={"card-content " + cardClass}>
                <div className={`card-header ${headerClass}`}>{header}</div>
                <div className={"card-body " + cardClass}>{body}</div>
            </div>
        </div>
    );
}
