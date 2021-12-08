import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Helpers/Context";
import useRemember from "./Helpers/useRemember";
import Navbar from "./Common/Navbar";
import Routing from "./Routes/Routing";
import Backend from "./api";
import "./Styles/App.css";

export default function App() {
    const lsToken = localStorage.getItem("token") || null;
    let lsUser = localStorage.getItem("user") || null;
    if (lsUser) {
        lsUser = JSON.parse(lsUser);
    }
    const [user, setUser] = useState(lsUser);
    const [token, setToken] = useState(lsToken);

    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [searchedFor, setSearchedFor] = useState("");
    const [remember, setRemember] = useRemember(token, user);

    const handleSearch = (evt) => {
        evt.preventDefault();
        async function apiSearch() {
            const res = await Backend.searchAll(query);
            const username = user ? user.username : null;
            console.log(
                "current username: ",
                username,
                "current query: ",
                query
            );
            await Backend.logQuery(query, username);
            setData(() => res.data.mediaInfo);
            setSearchedFor(() => query);
            if (user) {
                setUser((user) => ({
                    ...user,
                    queries: [...user.queries, query],
                }));
            }
        }
        apiSearch();
    };

    const contextObject = {
        dataState: { data, setData },
        queryState: { query, setQuery },
        handlers: { handleSearch },
        tokenState: { token, setToken },
        userState: { user, setUser },
        rememberState: { remember, setRemember },
        searchedForState: { searchedFor, setSearchedFor },
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
