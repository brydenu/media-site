import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Helpers/Context";
import "../Styles/Searchbar.css";

export default function Searchbar({ location }) {
    const { setQuery } = useContext(AppContext).queryState;
    const { handleSearch } = useContext(AppContext).handlers;
    const { searchedFor } = useContext(AppContext).searchedForState;
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { value } = evt.target;
        setQuery((curr) => value);
    };

    const handleSubmit = (evt) => {
        handleSearch(evt);
        navigate("/");
    };
    const generateSearchHeader = () => {
        if (searchedFor && location === "home") {
            return <h1 className="searched-header-title">Search again:</h1>;
        }
    };
    return (
        <>
            <form
                className={`search search-${location}`}
                onSubmit={handleSearch}
            >
                {generateSearchHeader()}
                <input
                    type="text"
                    name="q"
                    onChange={handleChange}
                    autoComplete="off"
                />
                <button type="button" onClick={handleSubmit}>
                    Search
                </button>
            </form>
        </>
    );
}
