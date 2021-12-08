import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import DEFAULT_IMAGE from "./img-not-found.jpeg";
import shortenText from "../Helpers/shortenText";
import "../Styles/MediaCard.css";

/** MeidaCard => (mediaData, mediaType)
 *
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
                {mediaData.year_released ||
                    mediaData.primary_artist ||
                    mediaData.years}
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
            cardClass={`media-card ${api_id}`}
        />
    );
}
