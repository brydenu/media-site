import React, { useContext } from "react";
import AppContext from "../Helpers/Context";
import "../Styles/Searchbar.css";

export default function Searchbar({ location }) {
    const { setQuery } = useContext(AppContext).queryState;
    const { handleSubmit } = useContext(AppContext).handlers;

    const handleChange = (evt) => {
        const { value } = evt.target;
        setQuery((curr) => value);
    };
    return (
        <form className={`search search-${location}`} onSubmit={handleSubmit}>
            <label htmlFor="q" />
            <input type="text" name="q" onChange={handleChange}></input>
            <button type="button" onClick={handleSubmit}>
                Search
            </button>
        </form>
    );
}
