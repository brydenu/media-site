import React from "react";
import Card from "./Card";
import DEFAULT_IMAGE from "./img-not-found.jpeg";
import shortenText from "../Helpers/shortenText";
import "../Styles/MediaCard.css";

/** MeidaCard => (mediaData, mediaType)
 *
 */
export default function MediaCard({ mediaData, mediaClass }) {
    const {
        title,
        id,
        image_url,
        release_year,
        runtime,
        episode_count,
        start_year,
        album,
        artist,
        link,
        release_date,
    } = mediaData;

    const createBody = () => {
        let result;
        if (mediaClass === "movie") {
            result = (
                <>
                    <p>Release Year: {release_year}</p>
                    <p>Runtime: {runtime}</p>
                </>
            );
        } else if (mediaClass === "show") {
            result = (
                <>
                    <p>Start Year: {start_year}</p>
                    <p>Episode Count: {episode_count}</p>
                </>
            );
        } else if (mediaClass === "song") {
            result = (
                <>
                    <p>Artist/Group: {shortenText(artist)}</p>
                    <p>Album: {shortenText(album)}</p>
                    <p>Release Date: {release_date}</p>
                </>
            );
        }
        return (
            <>
                <a href={link || "#"}>
                    <img
                        src={image_url || DEFAULT_IMAGE}
                        className="media-image"
                        alt={title}
                    />
                </a>
                {result}
            </>
        );
    };
    const resultHeader = (
        <h3 className={`result result-header ${mediaClass}`}>
            {shortenText(title)}
        </h3>
    );
    return (
        <Card
            header={resultHeader}
            body={createBody()}
            cardClass={`media-card ${id}`}
        />
    );
}
