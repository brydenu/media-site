import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Helpers/Context";
import "../Styles/Searchbar.css";

export default function Searchbar({ location, className }) {
    const { query, setQuery } = useContext(AppContext).queryState;
    const { searchAPI } = useContext(AppContext).handlers;
    const { searchedFor } = useContext(AppContext).searchedForState;
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { value } = evt.target;
        setQuery((curr) => value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchAPI();
        navigate(`/search`);
    };
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
                />
                <button type="submit" className="searchbar-btn">
                    Search
                </button>
            </form>
        </>
    );
}
