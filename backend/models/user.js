"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const {
    UnauthorizedError,
    BadRequestError,
    NotFoundError,
} = require("../helpers/errorHandling");

class User {
    /** Organizes User information in DB.
     *
     * Data: { username, first_name, last_name }
     */
    static async create({ username, password, first_name, last_name }) {
        try {
            const hashedPw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
            const res = await db.query(
                `INSERT INTO users (username,
                    password,
                    first_name,
                    last_name)
                    VALUES ($1, $2, $3, $4)
                    RETURNING username, password, first_name, last_name`,
                [username, hashedPw, first_name, last_name]
            );
            return res.rows[0];
        } catch (e) {
            throw new BadRequestError();
        }
    }

    /**
     * find: Finds user in DB (this does not log in - just a lookup method)
     *
     * username => user to find
     */
    static async find(username) {
        try {
            const res = await db.query(
                `
                SELECT username, first_name, last_name
                FROM users
                WHERE username = $1
                `,
                [username]
            );
            return res.rows[0];
        } catch (e) {
            throw new NotFoundError("Username not found");
        }
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
        try {
            const res = await db.query(
                `
                SELECT username, 
                       password, 
                       first_name AS "firstName", 
                       last_name AS "lastName"
                FROM users
                WHERE username = $1`,
                [username]
            );

            const user = res.rows[0];

            if (user) {
                const passwordIsValid = await bcrypt.compare(
                    password,
                    user.password
                );
                console.log("passwordIsValid: ", passwordIsValid);
                if (passwordIsValid) {
                    delete user.password;
                    console.log("user: ", user);
                    return user;
                }
            }
            throw new UnauthorizedError("Invalid username or password.");
        } catch (e) {
            throw new BadRequestError();
        }
    }

    static async update(username, data) {
        let { password, first_name, last_name } = data;
        let toUpdate = "";
        let updateVars = [username];
        if (password) {
            password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
            toUpdate += "password = $2";
            updateVars.push(password);
        }
        if (first_name) {
            if (updateVars.length === 1) {
                toUpdate = "first_name = $2";
            } else {
                toUpdate += `, first_name = $${updateVars.length + 1}`;
            }
            updateVars.push(first_name);
        }
        if (last_name) {
            if (updateVars.length === 1) {
                toUpdate = "last_name = $2";
            } else {
                toUpdate += `, last_name = $${updateVars.length + 1}`;
            }
            updateVars.push(last_name);
        }

        const res = await db.query(
            `
            UPDATE users
            SET ${toUpdate}
            WHERE username = $1
            RETURNING username, 
                      first_name AS "firstName",
                      last_name AS "lastName"`,
            updateVars
        );

        const user = res.rows[0];

        if (!user) throw new NotFoundError(`User "${username}" not found.`);

        delete user.password;
        return user;
    }
}

module.exports = User;
