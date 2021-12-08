const Movie = require("../models/movie");
const Show = require("../models/show");
const Song = require("../models/song");
const Query = require("../models/query");
const UsersQueries = require("../models/users_queries");
const { BadRequestError } = require("./errorHandling");

/**
 * saveQuery: Adds a query to the database to be referenced later.
 *
 * q => query term to be saved
 *
 * user => if there is a user, saves the users' query so they can reference their
 *         history later.
 */
async function saveQuery(q, username = null) {
    try {
        const res = await Query.create(q);
        if (username) {
            const quRes = await UsersQueries.create(username, res.id);
            console.log("query res: ", res, "users_queries res: ", quRes);
            return { query: res, users_queries: quRes };
        }
        console.log("res: ", res);
        return res;
    } catch {
        throw new BadRequestError(
            "Problem adding query to database (saveQuery error)."
        );
    }
}

/**
 * saveToDB: Adds rows to specified table from information fetched from APIs.
 *
 * table => Table to add row to ("songs", "movies", or "shows")
 *
 * data => Object containing all necessary information depending on which table is being added to.
 */
async function saveToDB(table, data) {
    try {
        if (table === "movies") {
            return Movie.create(data);
        } else if (table === "shows") {
            return Show.create(data);
        } else if (table === "songs") {
            return Song.create(data);
        }
    } catch {
        throw new BadRequestError(
            "Problem adding row to database (saveToDB error)."
        );
    }
}

async function getSearchTerms(username) {
    const query_ids = await UsersQueries.getUserQueries(username);
    const searchTerms = [];
    for (let q of query_ids) {
        const term = await Query.find(q.query_id);
        searchTerms.push(term.search_term);
    }
    return searchTerms;
}

module.exports = {
    saveQuery,
    saveToDB,
    getSearchTerms,
};
