import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import MediaCard from "../Common/MediaCard";
import Searchbar from "../Common/Searchbar";
import LoadingPage from "../Common/LoadingPage";
import "../Styles/Search.css";

/**
 * Main Search page:
 *
 * Appears after a search has been submitted. Shows a loading spinner page until the data has loaded.
 * Once the data has loaded, the loading spinner is unmounted and the organized results appear.
 *
 * The searchbar on this page can be toggled on and off.
 */
export default function Search() {
    const { data } = useContext(AppContext).dataState;
    const { searchedFor } = useContext(AppContext).searchedForState;
    const { searchAPI } = useContext(AppContext).handlers;
    const { loading } = useContext(AppContext).loadingState;
    const [searchParams, setSearchParams] = useSearchParams();
    const [showingSearch, setShowingSearch] = useState(false);
    const showSearchClass = showingSearch ? "show-searchbar" : "hide-searchbar";

    useEffect(() => {
        const q = searchParams.get("q");
        if (q && !loading && !data) {
            async function search() {
                setShowingSearch(false);
                await searchAPI(q);
            }
            return search();
        }
        if (!q || q === "") setSearchParams({ q: searchedFor });
    });

    const headerContent =
        data === null ? (
            <h1 className="home-title">
                Welcome, use the search bar to find media!
            </h1>
        ) : (
            <Searchbar location="search" className={showSearchClass} />
        );

    const toggleSearchbar = (evt) => {
        evt.preventDefault();
        setShowingSearch((currentState) => !currentState);
    };

    const generateResults = (data, type) => {
        if (!data || data.length === 0) {
            return (
                <h3 className="results-not-found">No {type} results found.</h3>
            );
        }
        return data.map((item) => (
            <MediaCard mediaData={item} mediaClass={type} />
        ));
    };
    const createBody = () => {
        const { movies, shows, songs } = data;
        return (
            <>
                <h2 className="search-title-searched">
                    Showing results for "{searchedFor}"
                </h2>
                <div className="results-all">
                    <div className="toggler-group">
                        <div
                            className={"toggler-wrapper " + showSearchClass}
                            onClick={toggleSearchbar}
                        >
                            <div className={`toggler ${showSearchClass}`} />
                        </div>
                        <p>Toggle Searchbar</p>
                    </div>
                    <div className="movies-wrapper media-wrapper">
                        <h2 className="group-title movies-color">Movies</h2>
                        <div className="movies-results media-results">
                            {generateResults(movies, "movie")}
                        </div>
                    </div>
                    <div className="shows-wrapper media-wrapper">
                        <h2 className="group-title shows-color">Shows</h2>
                        <div className="shows-results media-results">
                            {generateResults(shows, "show")}
                        </div>
                    </div>
                    <div className="songs-wrapper media-wrapper">
                        <h2 className="group-title songs-color">Songs</h2>
                        <div className="songs-results media-results">
                            {generateResults(songs, "song")}
                        </div>
                    </div>
                </div>
            </>
        );
    };

    if (!data) {
        return <LoadingPage />;
    }

    return (
        <div className="main main-home">
            <Card
                header={headerContent}
                body={createBody()}
                cardClass="search"
                headerClass={showSearchClass}
            />
        </div>
    );
}
