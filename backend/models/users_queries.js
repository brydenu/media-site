"use strict";

const db = require("../db");

class UsersQueries {
    static async create(user_id, query_id) {
        const res = await db.query(
            `
        INSERT INTO users_queries (usr_id, q_id)
        VALUES ($1, $2)
        RETURNING id, usr_id, q_id`,
            [user_id, query_id]
        );
        return res.rows[0];
    }

    static async find(id) {
        const res = await db.query(
            `
        SELECT id, usr_id, q_id
        FROM users_queries
        WHERE id=$1`,
            [id]
        );
        return res.rows[0];
    }
}

module.exports = UsersQueries;
