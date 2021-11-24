"use strict";

const db = require("../db");

class User {
    /** Organizes User information in DB.
     *
     * Data: { username, first_name, last_name, country_code }
     */
    static async create({ username, first_name, last_name, country_code }) {
        const res = await db.query(
            `INSERT INTO users (username,
                                first_name,
                                last_name,
                                country_code)
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, first_name, last_name, country_code`,
            [username, first_name, last_name, country_code]
        );
        return res.rows[0];
    }

    // Find user in database
    static async find({ id }) {
        const res = await db.query(
            `
            SELECT id, username, first_name, last_name, country_code
            FROM users
            WHERE id = $1
            `,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = User;
