"use strict";

const db = require("../db");

class Show {
    /** Organizes show information from API request to be ready to put into the database for faster subsequent retrievals.
     *
     * Data: {  api_id,
                title,
                rating,
                first_aired,
                genre,
                writer,
                plot,
                actors,
                awards,
                episode_length
                image_url,
                years,
                imdb_rating,
                imdb_votes,
                seasons 
            }
     */
    static async create({
        api_id,
        title,
        rating,
        first_aired,
        genre,
        writer,
        plot,
        actors,
        awards,
        episode_length,
        image_url,
        years,
        imdb_rating,
        imdb_votes,
        seasons,
    }) {
        const res = await db.query(
            `INSERT INTO shows (
                api_id,
                title,
                rating,
                first_aired,
                genre,
                writer,
                plot,
                actors,
                awards,
                episode_length,
                image_url,
                years,
                imdb_rating,
                imdb_votes,
                seasons
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
            RETURNING
                id,
                api_id,
                title,
                rating,
                first_aired,
                genre,
                writer,
                plot,
                actors,
                awards,
                episode_length,
                image_url,
                years,
                imdb_rating,
                imdb_votes,
                seasons`,
            [
                api_id,
                title,
                rating,
                first_aired,
                genre,
                writer,
                plot,
                actors,
                awards,
                episode_length,
                image_url,
                years,
                imdb_rating,
                imdb_votes,
                seasons,
            ]
        );
        return res.rows[0];
    }

    // Find show in database
    static async find(api_id) {
        const res = await db.query(
            `
            SELECT 
                id,                 
                api_id,
                title,
                rating,
                first_aired,
                genre,
                writer,
                plot,
                actors,
                awards,
                episode_length,
                image_url,
                years,
                imdb_rating,
                imdb_votes,
                seasons
            FROM shows
            WHERE api_id = $1
            `,
            [api_id]
        );
        console.log("Show.find() res.rows[0]: ", res.rows[0]);
        return res.rows[0];
    }

    // Find show in database
    static async dbFind(id) {
        const res = await db.query(
            `
            SELECT 
                id,                 
                api_id,
                title,
                rating,
                first_aired,
                genre,
                writer,
                plot,
                actors,
                awards,
                episode_length,
                image_url,
                years,
                imdb_rating,
                imdb_votes,
                seasons
            FROM shows
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Show;
