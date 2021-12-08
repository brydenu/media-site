"use strict";

const db = require("../db");

class MoviesQueries {
    static async create(query_id, movie_id) {
        const res = await db.query(
            `
            INSERT INTO movies_queries (query_id, movie_id)
            VALUES ($1, $2)
            RETURNING id, query_id, movie_id`,
            [query_id, movie_id]
        );
        return res.rows[0];
    }
}
