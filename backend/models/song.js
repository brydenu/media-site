"use strict";

const db = require("../db");

class Song {
    /** Organizes song information from API request to be ready to put into the database for faster subsequent retrievals.
     *
     * Data: { id, title, artist, album, release_date, image_url, link }
     */
    static async create({
        id,
        title,
        artist,
        album,
        release_date,
        image_url,
        link,
    }) {
        const res = await db.query(
            `INSERT INTO songs (id,
                                title,
                                artist,
                                album,
                                release_date,
                                image_url,
                                link)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, title, artist, album, release_date, image_url, link`,
            [id, title, artist, album, release_date, image_url, link]
        );
        return res.rows[0];
    }

    // Find song in database
    static async find(id) {
        const res = await db.query(
            `
            SELECT id, title, artist, album, release_date, image_url, link
            FROM songs
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Song;
