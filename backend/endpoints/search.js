const express = require("express");
const { searchAll } = require("../helpers/apiHandling");
const { saveQuery } = require("../helpers/dbHandling");

const router = express.Router();

router.get("/:query", async function (req, res, next) {
    try {
        const searchTerm = req.params.query;
        const queryInfo = await saveQuery(searchTerm);
        const mediaInfo = await searchAll(searchTerm);
        return res.json({ mediaInfo, queryInfo });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
