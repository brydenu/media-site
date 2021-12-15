"use strict";

const express = require("express");
const cors = require("cors");

const searchEndpoints = require("./endpoints/search");
const usersEndpoints = require("./endpoints/users");
const queriesEndpoints = require("./endpoints/queries");
const movieEndpoints = require("./endpoints/movie");
const showEndpoints = require("./endpoints/show");
const songEndpoints = require("./endpoints/song");
const { NotFoundError } = require("./helpers/errorHandling");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", searchEndpoints);
app.use("/users", usersEndpoints);
app.use("/queries", queriesEndpoints);
app.use("/movie", movieEndpoints);
app.use("/show", showEndpoints);
app.use("/song", songEndpoints);

app.use(function (req, res, next) {
    return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    const error = err.message;

    return res.json({
        error,
    });
});

module.exports = app;
