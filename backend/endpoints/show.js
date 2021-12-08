const express = require("express");
const Show = require("../models/show");
const { getShowById } = require("../helpers/apiHandling");

const router = express.Router();

router.get("/:id", async function (req, res, next) {
    const id = req.params.id;
    try {
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

module.exports = router;
