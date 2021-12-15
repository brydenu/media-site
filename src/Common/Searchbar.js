import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Helpers/Context";
import "../Styles/Searchbar.css";

/**
 * Reusable searchbar. Mounted to home page and navbar, along with a dynamic version on the search page that can be hidden away or shown
 * via a toggler.
 */
export default function Searchbar({ location, className }) {
    const { query, setQuery } = useContext(AppContext).queryState;
    const { searchAPI } = useContext(AppContext).handlers;
    const { searchedFor } = useContext(AppContext).searchedForState;
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    /**
     * Updates the current query state.
     */
    const handleChange = (evt) => {
        const { value } = evt.target;
        setQuery((curr) => value);
    };

    /**
     * useEffect is used here to listen for changes in the query state. This is useful for if a user tries to make an
     * invalid search (i.e. an empty string), and an appropriate error message pops up. Listening to query allows for the
     * message to go away as soon as any typing occurs (and works globally for all searchbars).
     *
     */
    useEffect(() => {
        setErrorMessage("");
    }, [query]);

    /**
     * Uses the searchAPI function from context to search, as well as checks for the invalid query.
     *
     * If query is invalid, do not submit and instead create an error message.
     */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!query) {
            setErrorMessage(
                "Searchbar cannot be empty. Please enter a search term."
            );
            return;
        }
        searchAPI();
        navigate(`/search`);
    };

    /**
     * Creates the header of the searchbar depending on the location of the searchbar ("home", "search", "navbar" (navbar has no text))
     */
    const generateSearchHeader = () => {
        if (searchedFor && location === "search") {
            return <h2 className={"searched-header-title"}>Search again:</h2>;
        } else if (location === "home") {
            return (
                <h2 className={"searched-header-title"}>
                    Use the search bar to find media
                </h2>
            );
        }
    };
    return (
        <>
            <form
                className={`search search-${location}`}
                onSubmit={handleSubmit}
            >
                {generateSearchHeader()}
                <input
                    type="text"
                    name="q"
                    onChange={handleChange}
                    autoComplete="off"
                    value={query}
                    placeholder={errorMessage}
                />
                <button type="submit" className="searchbar-btn">
                    Search
                </button>
            </form>
        </>
    );
}
