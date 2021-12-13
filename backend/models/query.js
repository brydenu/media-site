"use strict";

const db = require("../db");
const { BadRequestError } = require("../helpers/errorHandling");

class Query {
    /** Saves query information to find previous results if the user is signed in.
     *
     * term: Search term
     *
     * movies, songs, shows: Database IDs of top 3 hits from each media type, written in a string seperated by periods.
     */
    static async create({ query, movies, songs, shows }) {
        try {
            const res = await db.query(
                `INSERT INTO queries (search_term, top_movies, top_songs, top_shows)
                    VALUES ($1, $2, $3, $4)
                    RETURNING id, search_term, top_movies, top_songs, top_shows`,
                [query, movies, songs, shows]
            );
            return res.rows[0];
        } catch (e) {
            console.error(e);
            throw new BadRequestError("Problem creating new query row.");
        }
    }

    // Find query in database
    static async find(id) {
        const res = await db.query(
            `
            SELECT id, search_term, top_movies, top_songs, top_shows
            FROM queries
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Query;
