const express = require("express");
const User = require("../models/user");
const createToken = require("../helpers/token");
const { BadRequestError } = require("../helpers/errorHandling");
const { getSearchTerms } = require("../helpers/dbHandling");

const router = express.Router();

/**
 * POST /register: { user } => { user }
 *
 * Creates a user with given data.
 *
 * user should be: { username, first_name, last_name, password }
 */
router.post("/register", async function (req, res, next) {
    try {
        const userInfo = {
            username: req.body.username,
            password: req.body.password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
        };
        const found = await User.find(userInfo.username);
        if (found)
            return res.json({
                error: {
                    message: "Username already exists",
                    type: "unique_username",
                },
            });
        const user = await User.create(userInfo);
        // const token = createToken(user);
        return res.status(201).json({
            user: {
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                queries: [],
            },
        });
    } catch (e) {
        return next(e);
    }
});

/**
 * POST /login: { username, password } => { user }
 */
router.post("/login", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const queries = await getSearchTerms(user.username);
        user.queries = queries;
        return res.json({ user });
    } catch (e) {
        return next(e);
    }
});

/**
 * PATCH /:username { username, password, firstName(optional), lastName(optional) } => { user }
 */
router.patch("/:username", async function (req, res, next) {
    try {
        const sqlUser = {
            username: req.params.username,
            password: req.body.password,
            newPassword: req.body.newPassword,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
        };
        const user = await User.update(req.params.username, sqlUser);
        const queries = await getSearchTerms(user.username);
        user.queries = queries;
        return res.json({ user });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
