"use strict";

const db = require("../db");

class Movie {
    /** Organizes movie information from API request to be ready to put into the database for faster subsequent retrievals.
     *
     * Data: { id, title, release_year, image_url, runtime }
     */
    static async create({ id, title, release_year, image_url, runtime }) {
        const res = await db.query(
            `INSERT INTO movies (id,
                                title,
                                release_year,
                                image_url,
                                runtime)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, release_year, image_url, runtime`,
            [id, title, release_year, image_url, runtime]
        );
        return res.rows[0];
    }

    // Find movie in database
    static async find({ id }) {
        const res = await db.query(
            `
            SELECT id, title, release_year, image_url, runtime
            FROM movies
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Movie;
