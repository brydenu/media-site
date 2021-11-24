const express = require("express");
const searchAll = require("../apiHandling");

const router = express.Router();

router.get("/:query", async function (req, res, next) {
    try {
        const mediaInfo = await searchAll(req.params.query);
        return res.json({ mediaInfo });
    } catch (e) {
        console.log("!!!!!!!!!!!!!!there was an error!!!!!!!!!!!!!!!!");
        return next(e);
    }
});

module.exports = router;
