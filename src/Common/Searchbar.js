import React, { useState } from "react";
import Backend from "../api";

export default function Searchbar({ type }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        async function apiSearch() {
            const res = await Backend.searchAll(query);
            console.log(res);
        }
        apiSearch();
    };
    const handleChange = (evt) => {
        const { value } = evt.target;
        setQuery((curr) => value);
    };
    console.log(query);
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={"search " + type} />
            <input type="text" name="q" onChange={handleChange}></input>
            <button type="button" onClick={handleSubmit}>
                Search
            </button>
        </form>
    );
}
