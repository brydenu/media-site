import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card";
import Backend from "../api";
import LoadingSpinner from "./LoadingSpinner";
import DEFAULT_IMAGE from "./img-not-found.jpeg";
import "../Styles/MediaPage.css";

/**
 * MediaPage: Rendered when looking at a specific media item.
 *
 * Depending on which item it is, creates a large card that
 * displays deeper information of each item.
 */
export default function MediaPage({ mediaType }) {
    /**
     * Important to useParams here, as you could potentially find a media item and want to share it/save it.
     * If params are not used the correct item would not render, therefore you must be able to get to each media item manually (with params).
     */
    const { id } = useParams();
    const [pageInfo, setPageInfo] = useState(null);
    const navigate = useNavigate();
    let headerContent;
    let bodyContent;

    /**
     * Finds information on media item from backend based on url.
     */
    useEffect(
        function fetchInfoFromBackend() {
            async function fetchInfo() {
                const res = await Backend.getInfo(mediaType, id);
                setPageInfo(res);
            }
            fetchInfo();
        },
        [id, mediaType]
    );

    /**
     * Generates correct card with correct information depending on media type.
     * Populates fields with said information.
     */
    const generateInfo = () => {
        if (mediaType === "movie") {
            const {
                actors,
                awards,
                director,
                earnings,
                genre,
                imdb_rating,
                imdb_votes,
                rating,
                release_date,
                runtime,
                writer,
            } = pageInfo;
            return (
                <>
                    <p>
                        <b>Release year:</b> {release_date}
                    </p>
                    <p>
                        <b>Runtime:</b> {runtime}utes
                    </p>
                    <p>
                        <b>Starring:</b> {actors}
                    </p>
                    <p>
                        <b>Awards:</b> {awards}
                    </p>
                    <p>
                        <b>Director(s):</b> {director}
                    </p>
                    <p>
                        <b>Box Office Earnings:</b> {earnings}
                    </p>
                    <p>
                        <b>Genre:</b> {genre}
                    </p>
                    <p>
                        <b>IMDb Score:</b> {imdb_rating} ({imdb_votes} votes)
                    </p>
                    <p>
                        <b>Rating:</b> {rating}
                    </p>
                    <p>
                        <b>Writer(s):</b> {writer}
                    </p>
                </>
            );
        } else if (mediaType === "show") {
            const {
                actors,
                awards,
                episode_length,
                first_aired,
                genre,
                imdb_rating,
                imdb_votes,
                rating,
                seasons,
                writer,
                years,
            } = pageInfo;
            return (
                <>
                    <p>
                        <b>Starring:</b> {actors}
                    </p>
                    <p>
                        <b>Awards:</b> {awards}
                    </p>
                    <p>
                        <b>Episode Length:</b> {episode_length}
                    </p>
                    <p>
                        <b>Air Date:</b> {first_aired}
                    </p>
                    <p>
                        <b>Genre:</b> {genre}
                    </p>
                    <p>
                        <b>IMDb Rating:</b> {imdb_rating} ({imdb_votes} votes)
                    </p>
                    <p>
                        <b>Rating:</b> {rating}
                    </p>
                    <p>
                        <b>Seasons:</b> {seasons}
                    </p>
                    <p>
                        <b>Writer(s):</b> {writer}
                    </p>
                    <p>
                        <b>Years running:</b> {years}
                    </p>
                </>
            );
        } else if (mediaType === "song") {
            const { album, artist, genre, song_length, release_date } =
                pageInfo;
            return (
                <>
                    <p>
                        <b>Artist/Group:</b> {artist}
                    </p>
                    <p>
                        <b>Album:</b> {album}
                    </p>
                    <p>
                        <b>Release date:</b> {release_date}
                    </p>
                    <p>
                        <b>Length:</b> {song_length}
                    </p>
                    <p>
                        <b>Genre:</b> {genre}
                    </p>
                </>
            );
        }
    };

    /**
     * Depending on media type, the subheader can be different. Movies and shows have the plot listed here, while
     * songs have a 30 second playable clip here.
     */
    const generateSubheader = () => {
        if (mediaType === "song") {
            return (
                <audio controls className="audio-player">
                    <source src={pageInfo.preview} type="audio/x-m4a"></source>
                </audio>
            );
        }
        return <i className="media-page subheader">{pageInfo.plot}</i>;
    };

    /**
     * Allows for easier navigation back to search results so you dont have to search for the same thing again.
     */
    const handleGoBack = (evt) => {
        evt.preventDefault();
        navigate(-1);
    };

    const backButton = (
        <div className="back-btn" onClick={handleGoBack}>
            Go Back
        </div>
    );

    /**
     * Shows loading until info appears.
     *
     * Once pageInfo is updated, creates content for the return card.
     */
    if (pageInfo === null) {
        headerContent = <h1>Loading</h1>;
        bodyContent = <LoadingSpinner />;
    } else {
        headerContent = (
            <div className="image-wrapper">
                <img
                    src={
                        pageInfo.image_url === "N/A"
                            ? DEFAULT_IMAGE
                            : pageInfo.image_url
                    }
                    alt={pageInfo.title}
                    className="page-image"
                />
            </div>
        );
        bodyContent = (
            <>
                <h1 className={`media-page-title ${mediaType}-title`}>
                    {pageInfo.title}
                </h1>
                {generateSubheader()}
                <div className="page-info">{generateInfo()}</div>
            </>
        );
    }

    return (
        <>
            {backButton}
            <Card
                header={headerContent}
                body={bodyContent}
                cardClass={`media-page main ${mediaType}`}
            />
        </>
    );
}
