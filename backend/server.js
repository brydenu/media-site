"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
    console.log(`Api started on http://localhost:${PORT}`);
});
