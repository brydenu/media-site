const express = require("express");
const Song = require("../models/song");
const { getSongById } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    try {
        const song = await Song.find(id);
        if (song) {
            return res.json({ song });
        } else {
            const newSong = await getSongById(id);
            return res.json({ newSong });
        }
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
