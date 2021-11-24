"use strict";

const db = require("../db");

class Show {
    /** Organizes show information from API request to be ready to put into the database for faster subsequent retrievals.
     *
     * Data: { id, title, image_url, start_year, episode_count }
     */
    static async create({ id, title, image_url, start_year, episode_count }) {
        const res = await db.query(
            `INSERT INTO movies (id,
                                title,
                                image_url,
                                start_year,
                                episode_count,)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, image_url, start_year, episode_count`,
            [id, title, image_url, start_year, episode_count]
        );
        return res.rows[0];
    }

    // Find show in database
    static async find({ id }) {
        const res = await db.query(
            `
            SELECT id, title, image_url, start_year, episode_count
            FROM shows
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Show;
