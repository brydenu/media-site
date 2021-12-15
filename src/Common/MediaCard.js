import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import DEFAULT_IMAGE from "./img-not-found.jpeg";
import shortenText from "../Helpers/shortenText";
import "../Styles/MediaCard.css";

/**
 * MediaCard: The display format for search results. These cards do not have too much information on them, as
 *            you can click on each one to render a main page (<MediaPage />)for each media item which will include more info.
 *
 * mediaData: Media information to be used. For media cards, only the image_url, title, and depending on the
 *            media type, year released or artist/group name.
 *
 * mediaType: "movie", "show", or "song" Determines which pieces of information to show, as well as styling.
 */
export default function MediaCard({ mediaData, mediaClass }) {
    const { title, api_id } = mediaData;
    let image_url =
        mediaData.image_url === "N/A" ? DEFAULT_IMAGE : mediaData.image_url;

    const headerContent = (
        <>
            <h3 className={`result result-header ${mediaClass}`}>
                {shortenText(title)}
            </h3>
            <p className="sub-header">
                (
                {mediaData.year_released || mediaData.artist || mediaData.years}
                )
            </p>
        </>
    );

    const bodyContent = (
        <>
            <Link to={`/${mediaClass}/${api_id}`} className="image-wrapper">
                <img src={image_url} className="media-image" alt={title} />
            </Link>
        </>
    );
    return (
        <Card
            header={headerContent}
            body={bodyContent}
            cardClass={`media-card ${api_id} ${mediaClass}s-color`}
            cardKey={mediaData.api_id}
        />
    );
}
