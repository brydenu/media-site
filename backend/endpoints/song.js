const express = require("express");
const Song = require("../models/song");
const { getSongById } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
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

router.get("/db/:id", async function (req, res, next) {
    try {
        console.log("SONG DB SEARCH");
        const id = req.params.id;
        console.log("ID TO SEARCH: ", id);
        const song = await Song.dbFind(id);
        console.log("RESULT: ", song);
        return res.json({ song });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
