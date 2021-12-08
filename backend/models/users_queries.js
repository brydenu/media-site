"use strict";

const db = require("../db");

class UsersQueries {
    static async create(username, query_id) {
        const res = await db.query(
            `
            INSERT INTO users_queries (username, query_id)
            VALUES ($1, $2)
            RETURNING id, username, query_id`,
            [username, query_id]
        );
        return res.rows[0];
    }

    static async find(id) {
        const res = await db.query(
            `
            SELECT id, username, query_id
            FROM users_queries
            WHERE id=$1`,
            [id]
        );
        return res.rows[0];
    }

    static async getUserQueries(username) {
        const res = await db.query(
            `
                SELECT query_id 
                FROM users_queries
                WHERE username=$1
            `,
            [username]
        );
        console.log(res.rows);
        return res.rows;
    }
}

module.exports = UsersQueries;
