const express = require("express");
const Movie = require("../models/movie");
const { getMovieById } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    try {
        const movie = await Movie.find(id);
        if (movie) {
            return res.json({ movie });
        } else {
            const newMovie = await getMovieById(id);
            return res.json({ newMovie });
        }
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
