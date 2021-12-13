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
 * data => Database IDs of top 3 hits from each media type.
 *
 * user => if there is a user, saves the users' query so they can reference their
 *         history later.
 */
async function saveQuery(query, data, username = null) {
    try {
        const { songs, shows, movies } = data;
        const res = await Query.create({
            query,
            songs,
            shows,
            movies,
        });
        if (username) {
            const quRes = await UsersQueries.create(username, res.id);
            return { query: res, users_queries: quRes };
        }
        return res;
    } catch (e) {
        console.error(e);
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
            const createdShow = await Show.create(data);
            console.log(createdShow);
            return createdShow;
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
        searchTerms.push({
            term: term.search_term,
            topMovies: term.top_movies,
            topSongs: term.top_songs,
            topShows: term.top_shows,
        });
    }
    return searchTerms;
}

module.exports = {
    saveQuery,
    saveToDB,
    getSearchTerms,
};
