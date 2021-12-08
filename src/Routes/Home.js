import React, { useContext } from "react";
import AppContext from "../Helpers/Context";
import Card from "../Common/Card";
import MediaCard from "../Common/MediaCard";
import Searchbar from "../Common/Searchbar";
import "../Styles/Home.css";

export default function Home() {
    const { data } = useContext(AppContext).dataState;
    const { searchedFor } = useContext(AppContext).searchedForState;

    const headerContent =
        data === null ? (
            <h1 className="home-title">
                Welcome, use the search bar to find media!
            </h1>
        ) : (
            <>
                <Searchbar location="home" />
                <h2 className="home-title-searched">
                    Showing results for "{searchedFor}"
                </h2>
            </>
        );

    const createBody = () => {
        const { movies, shows, songs } = data;
        return (
            <div className="results-all">
                <div className="movies-wrapper media-wrapper">
                    <h2 className="group-title">Movies</h2>
                    <div className="movies-results media-results">
                        {movies.map((movie) => {
                            return (
                                <MediaCard
                                    mediaData={movie}
                                    mediaClass="movie"
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="shows-wrapper media-wrapper">
                    <h2 className="group-title">Shows</h2>
                    <div className="shows-results media-results">
                        {shows.map((show) => (
                            <MediaCard mediaData={show} mediaClass="show" />
                        ))}
                    </div>
                </div>
                <div className="songs-wrapper media-wrapper">
                    <h2 className="group-title">Songs</h2>
                    <div className="songs-results media-results">
                        {songs.map((song) => {
                            return (
                                <MediaCard mediaData={song} mediaClass="song" />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    let bodyContent =
        data === null ? <Searchbar location="home" /> : createBody();

    return (
        <div className="main-home">
            <Card header={headerContent} body={bodyContent} cardClass="home" />
        </div>
    );
}
