import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card";
import Backend from "../api";
import "../Styles/MediaPage.css";

export default function MediaPage({ mediaType }) {
    const { id } = useParams();
    const [pageInfo, setPageInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(function fetchInfoFromBackend() {
        async function fetchInfo() {
            const res = await Backend.getInfo(mediaType, id);
            setPageInfo(res);
        }
        fetchInfo();
    }, []);

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
            const { album, all_artists, primary_artist, release_date } =
                pageInfo;
            return (
                <>
                    <p>
                        <b>Primary Artist/Group:</b> {primary_artist}
                    </p>
                    <p>
                        <b>Other artists/groups:</b> {all_artists}
                    </p>
                    <p>
                        <b>Album:</b> {album}
                    </p>
                    <p>
                        <b>Release date:</b> {release_date}
                    </p>
                </>
            );
        }
    };

    const handleGoBack = (evt) => {
        evt.preventDefault();
        navigate(-1);
    };

    const backButton = (
        <div className="back-btn" onClick={handleGoBack}>
            Go Back
        </div>
    );

    let headerContent;
    let bodyContent;
    const generateSubheader = () => {
        if (mediaType === "song") {
            function createEmbed() {
                return { __html: pageInfo.embed };
            }
            return (
                <i
                    className="media-page subheader"
                    dangerouslySetInnerHTML={createEmbed()}
                />
            );
        }
        return <i className="media-page subheader">{pageInfo.plot}</i>;
    };
    if (pageInfo === null) {
        headerContent = <h1>Loading</h1>;
        bodyContent = <h1>Loading</h1>;
    } else {
        headerContent = (
            <>
                <img
                    src={pageInfo.image_url}
                    alt={pageInfo.title}
                    className="page-image"
                />
            </>
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
