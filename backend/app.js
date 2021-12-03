"use strict";

const express = require("express");
const cors = require("cors");

const searchEndpoints = require("./endpoints/search");
const usersEndpoints = require("./endpoints/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", searchEndpoints);
app.use("/users", usersEndpoints);

app.use(function (req, res, next) {
    console.log("!!!~~~~~~~~~~~~~~~~~~~~404~~~~~~~~~~~~~~~~~~~~!!!");
});

module.exports = app;
