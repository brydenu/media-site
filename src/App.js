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
    /**
     * Checking for user in localStorage (if returning user wanted their information
     * to be remembered last time they signed in.)
     *  */
    const lsToken = localStorage.getItem("token") || null;
    let lsUser = localStorage.getItem("user") || null;
    if (lsUser) {
        lsUser = JSON.parse(lsUser);
    }

    /**
     * Set up pieces of state that will be used globally through context.
     *
     * (This is an area of improvement I will look to condense into one or two
     * state objects rather than several pieces of state that end up getting
     * put into a context object anyway...)
     */
    const [user, setUser] = useState(lsUser);
    const [token, setToken] = useState(lsToken);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [searchedFor, setSearchedFor] = useState("");
    const [remember, setRemember] = useRemember(token, user);

    /**
     * searchAPI: The main search handler. This will be exported through the context to be used
     *            anywhere there is a searchbar.
     *
     * q: The query to be searched. This is optional, as you can technically also
     *    search by using the /search?q=QUERY url.
     *
     * Requests a database search or API search based on the current query and updates the "data" state
     * with the response information. Most implementations of this function redirect the user to /search
     * which automatically uses the information in the "data" state to create a result page.
     *
     * Also saves query history anonymously and/or for a user depending on if the user is signed in.
     *
     *  */
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

    /**
     * The main, big context object. Many of these state variables are used throughout the app.
     *
     * As stated above, this could use some cleaning up, there could simply be one or 2 pieces of state that are
     * each an object, rather than several pieces of state that just get organized into an object later.
     */
    const contextObject = {
        dataState: { data, setData },
        queryState: { query, setQuery },
        handlers: { searchAPI },
        tokenState: { token, setToken },
        userState: { user, setUser },
        rememberState: { remember, setRemember },
        searchedForState: { searchedFor, setSearchedFor },
        loadingState: { loading, setLoading },
    };
    return (
        <div className="App">
            <BrowserRouter>
                <AppContext.Provider value={contextObject}>
                    <Navbar />
                    <Routing />
                </AppContext.Provider>
            </BrowserRouter>
        </div>
    );
}
