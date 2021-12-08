"use strict";

const db = require("../db");

class Song {
    /** Organizes song information from API request to be ready to put into the database for faster subsequent retrievals.
     *
     * Data: { api_id, title, primary_artist, all_artists, album, release_date, image_url, embed }
     */
    static async create({
        api_id,
        title,
        primary_artist,
        all_artists,
        album,
        release_date,
        image_url,
        embed,
    }) {
        const res = await db.query(
            `INSERT INTO songs (        
                api_id,
                title,
                primary_artist,
                all_artists,
                album,
                release_date,
                image_url,
                embed
            )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING 
                id,         
                api_id,
                title,
                primary_artist,
                all_artists,
                album,
                release_date,
                image_url
                embed`,
            [
                api_id,
                title,
                primary_artist,
                all_artists,
                album,
                release_date,
                image_url,
                embed,
            ]
        );
        return res.rows[0];
    }

    // Find song in database
    static async find(api_id) {
        const res = await db.query(
            `
            SELECT id,         
                api_id,
                title,
                primary_artist,
                all_artists,
                album,
                release_date,
                image_url,
                embed
            FROM songs
            WHERE api_id = $1
            `,
            [api_id]
        );
        return res.rows[0];
    }
}

module.exports = Song;
