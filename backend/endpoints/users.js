const express = require("express");
const User = require("../models/user");

const router = express.Router();

/**
 * POST /register: { user } => { user }
 *
 * Creates a user with given data.
 *
 * user should be: { username, first_name, last_name, country_code, password }
 */
router.post("/register", async function (req, res, next) {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({ user });
    } catch (e) {
        return console.error(e);
    }
});

/**
 * POST /login: { username, password } => { user }
 */
router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = User.authenticate(username, password);
        return res.json({ user });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
