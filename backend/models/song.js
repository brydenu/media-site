"use strict";

const db = require("../db");

class Song {
    /** Organizes song information from API request to be ready to put into the database for faster subsequent retrievals.
     *
     * Data: { api_id, title, artist, genre, song_length, album, release_date, image_url, preview, year }
     */
    static async create({
        api_id,
        title,
        artist,
        genre,
        song_length,
        album,
        release_date,
        image_url,
        preview,
        year,
    }) {
        const res = await db.query(
            `INSERT INTO songs (        
                api_id,
                title,
                artist,
                genre,
                song_length,
                album,
                release_date,
                image_url,
                preview,
                year
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING 
                id,
                api_id,
                title,
                artist,
                genre,
                song_length,
                album,
                release_date,
                image_url,
                preview,
                year`,
            [
                api_id,
                title,
                artist,
                genre,
                song_length,
                album,
                release_date,
                image_url,
                preview,
                year,
            ]
        );
        return res.rows[0];
    }

    // Find song in database
    static async find(api_id) {
        const res = await db.query(
            `
            SELECT
                id,   
                api_id,
                title,
                artist,
                genre,
                song_length,
                album,
                release_date,
                image_url,
                preview,
                year
            FROM songs
            WHERE api_id = $1
            `,
            [api_id]
        );
        return res.rows[0];
    }

    // Find song in database
    static async dbFind(id) {
        const res = await db.query(
            `
            SELECT
                id         
                api_id,
                title,
                artist,
                genre,
                song_length,
                album,
                release_date,
                image_url,
                preview,
                year
            FROM songs
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Song;
