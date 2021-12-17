import React, { useState } from "react";
import AppContext from "./Helpers/Context";
import useRemember from "./Helpers/useRemember";

export default function TestContext({ children }) {
    const testUser = {
        username: "testUsername",
        firstName: "testFirstName",
        lastName: "testLastName",
        queries: [
            {
                search_term: "testSearchTerm",
                topMovies: "1.2.3",
                topSongs: "1.2.3",
                topShows: "1.2.3",
            },
        ],
    };

    const [user, setUser] = useState(testUser);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [query, setQuery] = useState("");
    const [searchedFor, setSearchedFor] = useState("");
    const [remember, setRemember] = useRemember(token, user);

    const searchAPI = (q = null) => {
        return "testSearchApi";
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
    };

    return (
        <AppContext.Provider value={contextObject}>
            {children}
        </AppContext.Provider>
    );
}
