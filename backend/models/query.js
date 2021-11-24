"use strict";

const db = require("../db");

class Query {
    /** Saves query information to find previous results if the user is signed in.
     *
     * Data: { searchTerm, userId }
     */
    static async create({ user, term }) {
        const res = await db.query(
            `INSERT INTO queries (userid, search_term)
            VALUES ($1, $2)
            RETURNING userid, search_term`,
            [user, term]
        );
        return res.rows[0];
    }

    // Find query in database
    static async find({ id }) {
        const res = await db.query(
            `
            SELECT id, userid, search_term
            FROM queries
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = Query;
