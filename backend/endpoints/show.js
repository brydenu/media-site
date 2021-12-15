const express = require("express");
const Show = require("../models/show");
const { getShowById } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        if (id.substring(0, 2) !== "tt") {
            throw new NotFoundError(
                "Movie and show IDs must start with 'tt' to be referenced with IMDb"
            );
        }
        const show = await Show.find(id);
        if (show) {
            return res.json({ show });
        } else {
            const newShow = await getShowById(id);
            return res.json({ newShow });
        }
    } catch (e) {
        return next(e);
    }
});

router.get("/db/:id", async function (req, res, next) {
    try {
        console.log("SHOW DB SEARCH");
        const id = req.params.id;
        console.log("ID TO SEARCH: ", id);
        const show = await Show.dbFind(id);
        console.log("RESULT: ", show);
        return res.json({ show });
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
