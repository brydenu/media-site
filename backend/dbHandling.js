const Movie = require("./models/movie");
const Show = require("./models/show");
const Song = require("./models/song");
const Query = require("./models/query");
const UsersQueries = require("./models/users_queries");

/**
 * saveQuery: Adds a query to the database to be referenced later.
 *
 * q => query term to be saved
 *
 * user => if there is a user, saves the users' query so they can reference their
 *         history later.
 */
async function saveQuery(q, user = null) {
    const res = await Query.create(q);
    if (user) {
        const quRes = await UsersQueries.create(user, q);
        return { query: res, users_queries: quRes };
    }
    console.log("res: ", res);
    return res;
}

/**
 * saveMovie: checks for movie in the database, and saves it if it is not already there.
 *
 * data => movie object created in the apiHandling file.
 */
async function saveMovie(data) {
    console.log("data.id: ", data.id);
    try {
        const movie = await Movie.find(data.id);
        if (movie) {
            // console.log("movie is already in DB: ", movie);
        } else {
            const res = await Movie.create(data);
            // console.log("new movie added to db: ", res);
        }
    } catch {
        console.error("movie: did not work: ", e);
    }
}

/**
 * saveSong: checks for song in the database, and saves it if it is not already there.
 *
 * data => song object created in the apiHandling file.
 */
async function saveSong(data) {
    try {
        const song = await Song.find(data.id);
        if (song) {
            // console.log("song is already in DB: ", song);
        } else {
            const res = await Song.create(data);
            // console.log("new song added to db: ", res);
        }
    } catch {
        console.error("song: did not work: ", e);
    }
}

/**
 * saveShow: checks for show in the database, and saves it if it is not already there.
 *
 * data => show object created in the apiHandling file.
 */
async function saveShow(data) {
    try {
        const show = await Show.find(data.id);
        if (show) {
            console.log("show is already in DB: ", show);
        } else {
            const res = await Show.create(data);
            console.log("new show added to db: ", res);
        }
    } catch (e) {
        console.error("show: did not work: ", e);
    }
}

module.exports = {
    saveQuery,
    saveMovie,
    saveSong,
    saveShow,
};
