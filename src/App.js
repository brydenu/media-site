import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Helpers/Context";
import Navbar from "./Common/Navbar";
import Routing from "./Routes/Routing";
import Backend from "./api";
import "./Styles/App.css";

export default function App() {
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        async function apiSearch() {
            const res = await Backend.searchAll(query);
            setData(res.data.mediaInfo);
        }
        apiSearch();
    };

    const contextObject = {
        dataState: { data, setData },
        queryState: { query, setQuery },
        handlers: { handleSubmit },
    };

    return (
        <div className="App">
            <AppContext.Provider value={contextObject}>
                <BrowserRouter>
                    <Navbar />
                    <Routing />
                </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
}

/** SET UP CONTEXT FOR RESULTS - WILL BE PERSISTENT
 *   IF LEAVING PAGE TO GO TO PROFILE/ETC. GOOD IF SEARCHING
 *   AND THEN YOU LOG IN AND YOUR SEARCH IS STILL THERE. HELPS FUNCTIONALITY
 *   SO YOU CAN HAVE SEARCHBAR IN NAVBAR AND SEARCHBAR IN HOME IF NO RESULTS.
 */
