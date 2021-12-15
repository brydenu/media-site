import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Helpers/Context";
import LoadingSpinner from "./LoadingSpinner";
import getPrettyHistory from "../Helpers/getPrettyHistory";
import DEFAULT_IMAGE from "./img-not-found.jpeg";
import Card from "./Card";

/**
 * HistoryCard: Renders a card with the top 3 results of each media type along with the query.
 *
 * size: Determines what size for the card. For now, this is only used in the profile tab and is "small". But can be made to
 * be a page size, which is something I would like to add.
 *
 */
export default function HistoryCard({ size = "page" }) {
    const { user } = useContext(AppContext).userState;
    const [history, setHistory] = useState([]);

    /**
     * Must get history first, and organize it to be ready for display.
     *
     * User queries are already saved, so its only a matter of dissecting the first 3 hits of each media type
     * per query, and getting those results again to be displayed on the card.
     */
    useEffect(() => {
        async function getHistory() {
            const h = await getPrettyHistory(user.queries);
            setHistory(h);
        }
        getHistory();
    }, [user]);

    /**
     * Creates the body of the history card. Checks each query and the information along with it, and
     * creates history cards for each query.
     */
    function generateHistBody() {
        /**
         * Show a spinner until the history is updated.
         */
        if (!history.length) {
            return <LoadingSpinner loaderClass="profile-loader" />;
        }
        /**
         * If A search term didn't get any results, instead of showing a blank or
         * strangely styled card, instead handle it by explaining that that
         * particular query did not have any successful results.
         */
        return (
            <div className="history-wrapper showing-history">
                {history.map((mediaType) => {
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

    /**
     * If the user does not have any queries, show a different message.
     */
    if (!user.queries.length)
        return (
            <div className="profile-no-queries history-wrapper card-wrapper">
                <h3>
                    You haven't searched for anything yet! Use the search bar
                    above or at the home screen to search for media info!
                </h3>
                <p>
                    History cards with the top results for each search will
                    appear here once you've searched for something.
                </p>
            </div>
        );

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
    return generateHistory();
}
