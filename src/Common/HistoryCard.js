import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Helpers/Context";
import LoadingSpinner from "./LoadingSpinner";
import getPrettyHistory from "../Helpers/getPrettyHistory";
import DEFAULT_IMAGE from "./img-not-found.jpeg";
import Card from "./Card";

export default function HistoryCard({ size = "page" }) {
    const { user } = useContext(AppContext).userState;
    const [history, setHistory] = useState([]);
    useEffect(() => {
        async function getHistory() {
            const h = await getPrettyHistory(user.queries);
            setHistory(h);
        }
        getHistory();
    }, [user]);
    const generateHistory = () => {
        const histHeader = (
            <div className="profile-title">
                {user.username}'s previous searches:
            </div>
        );
        return (
            <Card
                header={histHeader}
                body={generateHistBody()}
                cardClass="user-history"
            />
        );
    };

    function generateHistBody() {
        if (!history.length) {
            return <LoadingSpinner loaderClass="profile-loader" />;
        }
        let count = 0;
        return (
            <div className="history-wrapper showing-history">
                {history.map((mediaType) => {
                    count++;
                    if (
                        (!mediaType.movies.length && !mediaType.shows.length) ||
                        (!mediaType.movies.length && !mediaType.songs.length) ||
                        (!mediaType.songs.length && !mediaType.shows.length)
                    ) {
                        return (
                            <div className="history-card not-found">
                                <p className="history-card-title not-found">
                                    "{mediaType.term}"
                                </p>
                                <div className="history-card-images">
                                    No results found
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div className="history-card">
                            <p className="history-card-title">
                                "{mediaType.term}"
                            </p>
                            <div className="history-card-images">
                                <div className="movie-history">
                                    {mediaType.movies.map(({ movie }) => {
                                        if (!movie)
                                            return (
                                                <img
                                                    src="#"
                                                    alt="no-result"
                                                    className="history-image"
                                                />
                                            );
                                        const image =
                                            movie.image_url === "N/A"
                                                ? DEFAULT_IMAGE
                                                : movie.image_url;
                                        return (
                                            <img
                                                src={image}
                                                className="history-image"
                                                alt={movie.title}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="show-history">
                                    {mediaType.shows.map(({ show }) => {
                                        if (!show)
                                            return (
                                                <img
                                                    src="#"
                                                    alt="no-result"
                                                    className="history-image"
                                                />
                                            );
                                        const image =
                                            show.image_url === "N/A"
                                                ? DEFAULT_IMAGE
                                                : show.image_url;
                                        return (
                                            <img
                                                src={image}
                                                className="history-image"
                                                alt={show.title}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="song-history">
                                    {mediaType.songs.map(({ song }) => {
                                        if (!song)
                                            return (
                                                <img
                                                    src="#"
                                                    alt="no-result"
                                                    className="history-image"
                                                />
                                            );
                                        const image =
                                            song.image_url === "N/A"
                                                ? DEFAULT_IMAGE
                                                : song.image_url;
                                        return (
                                            <img
                                                src={image}
                                                className="history-image"
                                                alt={song.title}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    return generateHistory();
}
