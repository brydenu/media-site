import React from "react";
import "../Styles/Loading.css";

/**
 * Free open source loading spinner courtesy of https://loading.io/css/
 */
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
