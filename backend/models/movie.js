"use strict";

const db = require("../db");

class Movie {
    /**
     * Stores data from api requests into database for faster subsequent retrieval.
     *
     * Data: { api_id, title, release_year, image_url, runtime }
     */
    static async create({
        api_id,
        title,
        rating,
        genre,
        release_date,
        image_url,
        runtime,
        director,
        writer,
        plot,
        year_released,
        actors,
        awards,
        imdb_rating,
        imdb_votes,
        earnings,
    }) {
        const res = await db.query(
            `INSERT INTO movies (
                api_id,
                title,
                rating,
                genre,
                release_date,
                image_url,
                runtime,
                director,
                writer,
                plot,
                year_released,
                actors,
                awards,
                imdb_rating,
                imdb_votes,
                earnings
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING
                id,
                api_id,
                title,
                rating,
                genre,
                release_date,
                image_url,
                runtime,
                director,
                writer,
                plot,
                year_released,
                actors,
                awards,
                imdb_rating,
                imdb_votes,
                earnings`,
            [
                api_id,
                title,
                rating,
                genre,
                release_date,
                image_url,
                runtime,
                director,
                writer,
                plot,
                year_released,
                actors,
                awards,
                imdb_rating,
                imdb_votes,
                earnings,
            ]
        );
        return res.rows[0];
    }

    // Find movie in database
    static async find(api_id) {
        const res = await db.query(
            `
            SELECT 
                id, 
                api_id,
                title,
                rating,
                genre,
                release_date,
                image_url,
                runtime,
                director,
                writer,
                plot,
                year_released,
                actors,
                awards,
                imdb_rating,
                imdb_votes,
                earnings
            FROM movies
            WHERE api_id = $1
            `,
            [api_id]
        );
        return res.rows[0];
    }
}

module.exports = Movie;
