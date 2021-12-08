const jwt = require("jsonwebtoken");
const { API_KEY } = require("../config");

function createToken(user) {
    const payload = { username: user.username };
    return jwt.sign(payload, API_KEY);
}

module.exports = createToken;
