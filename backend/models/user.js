"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");

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
            RETURNING username, first_name, last_name, country_code`,
            [username, first_name, last_name, country_code]
        );
        return res.rows[0];
    }

    /**
     * find: Finds user in DB (this does not log in - just a lookup method)
     *
     * username => user to find
     */
    static async find(username) {
        const res = await db.query(
            `
            SELECT username, first_name, last_name, country_code
            FROM users
            WHERE username = $1
            `,
            [username]
        );
        return res.rows[0];
    }

    /**
     * Checks for user in database. If user exists, compares passwords and sends
     * user info if password is valid.
     *
     * username => username to lookup.
     *
     * password => password to compare
     */
    static async authenticate(username, password) {
        const user = await db.query(
            `
            SELECT username, password
            from users
            WHERE username = $1`,
            [username]
        );

        if (user) {
            const passwordIsValid = await bcrypt.compare(
                password,
                user.password
            );
            if (passwordIsValid) {
                delete user.password;
                return user;
            }
        }
        console.error("Incorrect username or password.");
    }
}

module.exports = User;
