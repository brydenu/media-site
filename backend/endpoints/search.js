const express = require("express");
const searchAll = require("../apiHandling");
const { saveQuery } = require("../dbHandling");

const router = express.Router();

router.get("/:query", async function (req, res, next) {
    try {
        const searchTerm = req.params.query;
        const queryInfo = await saveQuery(searchTerm);
        const mediaInfo = await searchAll(searchTerm);
        return res.json({ mediaInfo, queryInfo });
    } catch (e) {
        console.error("!!!!!!!!!!!!!!there was an error!!!!!!!!!!!!!!!!");
        return next(e);
    }
});

module.exports = router;
