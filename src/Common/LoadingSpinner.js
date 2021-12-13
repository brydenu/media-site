import React from "react";
import "../Styles/Loading.css";

export default function LoadingSpinner({ loaderClass = "loading-animation" }) {
    return (
        <div className={"lds-default " + loaderClass}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
