import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./Helpers/Context";
import useRemember from "./Helpers/useRemember";
import Navbar from "./Common/Navbar";
import Routing from "./Routes/Routing";
import Backend from "./api";
import makeTopResults from "./Helpers/makeTopResults";
import "./Styles/App.css";

export default function App() {
    const lsToken = localStorage.getItem("token") || null;
    let lsUser = localStorage.getItem("user") || null;
    if (lsUser) {
        lsUser = JSON.parse(lsUser);
    }
    const [user, setUser] = useState(lsUser);
    const [token, setToken] = useState(lsToken);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [searchedFor, setSearchedFor] = useState("");
    const [remember, setRemember] = useRemember(token, user);
    const [errorState, setErrorState] = useState(null);

    const searchAPI = (q = null) => {
        async function apiSearch() {
            const apiQ = q ? q : query;
            setQuery("");
            setLoading(true);
            setData(null);
            setSearchedFor(apiQ);
            const res = await Backend.searchAll(apiQ);
            const username = user ? user.username : null;
            const mediaData = res.data.mediaInfo;
            const { movies, shows, songs } = mediaData;
            const topResults = await makeTopResults(movies, shows, songs);
            const userQueries = await Backend.logQuery(
                apiQ,
                topResults,
                username
            );
            setData(() => mediaData);
            setLoading(false);
            if (user) {
                setUser((user) => ({
                    ...user,
                    queries: userQueries.queryInfo,
                }));
            }
        }
        apiSearch();
    };

    const contextObject = {
        dataState: { data, setData },
        queryState: { query, setQuery },
        handlers: { searchAPI },
        tokenState: { token, setToken },
        userState: { user, setUser },
        rememberState: { remember, setRemember },
        searchedForState: { searchedFor, setSearchedFor },
        loadingState: { loading, setLoading },
        errorState: { errorState, setErrorState },
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
