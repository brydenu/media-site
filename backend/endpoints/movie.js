const express = require("express");
const Movie = require("../models/movie");
const { getMovieById } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
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

router.get("/db/:id", async function (req, res, next) {
    try {
        console.log("MOVIE DB SEARCH");
        const id = req.params.id;
        console.log("ID TO SEARCH: ", id);
        const movie = await Movie.dbFind(id);
        console.log("RESULT: ", movie);
        return res.json({ movie });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
