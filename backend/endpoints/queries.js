const express = require("express");
const { saveQuery, getSearchTerms } = require("../helpers/dbHandling");
const UsersQueries = require("../models/users_queries");

const router = express.Router();

router.post("/", async function (req, res, next) {
    try {
        const { query, data, username } = req.body;
        let queryInfo = await saveQuery(query, data, username);
        if (username) {
            queryInfo = await getSearchTerms(username);
        }
        return res.json({ queryInfo });
    } catch (e) {
        return next(e);
    }
});

router.get("/:username", async function (req, res, next) {
    try {
        const username = req.params.username;
        const queries = await getSearchTerms(username);
        return res.json({ queries });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
