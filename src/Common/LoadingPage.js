import React, { useContext } from "react";
import AppContext from "../Helpers/Context";
import LoadingSpinner from "./LoadingSpinner";
import "../Styles/Loading.css";

export default function LoadingPage() {
    const { data } = useContext(AppContext).dataState;
    const { setLoading } = useContext(AppContext).loadingState;

    if (data) {
        setLoading(true);
        // return <Search />;
    }
    return (
        <div className="loading-wrapper">
            <div className="loading-content">
                <p>Loading results, please wait.</p>
                <LoadingSpinner />
            </div>
        </div>
    );
}
