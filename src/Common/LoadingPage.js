import React, { useContext } from "react";
import AppContext from "../Helpers/Context";
import LoadingSpinner from "./LoadingSpinner";
import "../Styles/Loading.css";

/**
 * Renders while the backend queries APIs for information. Uses a the <LoadingSpinner /> component.
 */
export default function LoadingPage() {
    const { data } = useContext(AppContext).dataState;
    const { setLoading } = useContext(AppContext).loadingState;

    return (
        <div className="loading-wrapper">
            <div className="loading-content">
                <p>Loading results, please wait.</p>
                <LoadingSpinner />
            </div>
        </div>
    );
}
