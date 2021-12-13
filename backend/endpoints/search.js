const express = require("express");
const { searchAll } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:query", async function (req, res, next) {
    try {
        const searchTerm = req.params.query;
        console.log(`Searching for ${searchTerm}`);
        const mediaInfo = await searchAll(searchTerm);
        return res.json({ mediaInfo });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
