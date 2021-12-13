const axios = require("axios");
const { API_KEY } = require("../config.js");
const { saveToDB } = require("./dbHandling.js");
const { BadRequestError, NotFoundError } = require("./errorHandling.js");
const Show = require("../models/show");
const Movie = require("../models/movie");
const Song = require("../models/song");

const movieShow = {
    url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
    host: "movie-database-imdb-alternative.p.rapidapi.com",
};

const itunes = {
    url: "https://itunes.apple.com/search?media=music&limit=10&term=",
    songLookup: " https://itunes.apple.com/lookup?id=",
};

/**
 * search - Manages requests so one request will search multiple tables and query multiple APIs correctly.
 *
 * term => the query to search
 *
 * api => which api to query
 */

async function search(term, api, isSeries = false) {
    let options;
    if (api === "itunes") {
        options = {
            method: "GET",
            url: itunes.url + term,
        };
    } else if (api === "movieShow") {
        let params = { s: term, r: "json", page: "1" };
        if (isSeries) {
            params.type = "series";
        } else {
            params.type = "movie";
        }
        options = {
            method: "GET",
            url: movieShow.url,
            params: params,
            headers: {
                "x-rapidapi-host": movieShow.host,
                "x-rapidapi-key": API_KEY,
            },
        };
    }
    const res = await axios.request(options);
    if (api === "movieShow" && !res.data.Search) return [];
    if (api === "itunes" && res.data.resultCount === 0) return [];
    return organizeData(res.data, api);
}

/**
 * organizeData - Sends response objects to the right filtering function.
 *
 * data => res.data response object from an api request.
 *
 * api => api used to get the data (either movieShow or itunes), this is the condition for which filter function is used.
 */

async function organizeData(data, api) {
    if (api === "movieShow") {
        return filterMovieShow(data.Search);
    } else if (api === "itunes") {
        return filterSong(data.results);
    }
}

/**
 * filterMovieShow - Creates objects of the return data formatted for database and frontend.
 *
 * res => response object to be formatted. Contains data for either a show or movie.
 *
 */
async function filterMovieShow(res) {
    try {
        if (res[0].Type === "series") {
            const shows = [];
            for (let show of res) {
                const showInDB = await Show.find(show.imdbID);
                console.log(
                    `Attempting to find show "${show.Title}" in database.`
                );
                if (showInDB) {
                    console.log("Show found in database.");
                    console.log(showInDB);
                    shows.push(showInDB);
                } else {
                    const newShow = await getShowById(show.imdbID);
                    shows.push(newShow);
                }
            }
            console.log(shows);
            return { shows };
        }
        const movies = [];
        for (let movie of res) {
            const movieInDB = await Movie.find(movie.imdbID);
            console.log(
                `Attempting to find movie "${movie.Title}" in database.`
            );
            if (movieInDB) {
                console.log("Movie found in database.");
                movies.push(movieInDB);
            } else {
                const newMovie = await getMovieById(movie.imdbID);
                movies.push(newMovie);
            }
        }
        return { movies };
    } catch (e) {
        throw new NotFoundError(e);
    }
}

async function queryMovieShow(id) {
    const { host, url } = movieShow;
    const options = {
        method: "GET",
        url: url,
        params: { r: "json", i: id },
        headers: {
            "x-rapidapi-host": host,
            "x-rapidapi-key": API_KEY,
        },
    };
    const res = await axios.request(options);
    return res.data;
}

async function getMovieById(id) {
    const info = await queryMovieShow(id);
    if (info.Type !== "movie") {
        throw new BadRequestError(
            "Wrong media type. The requested ID was a show but you requested a movie."
        );
    }
    console.log(`Movie not found, adding movie to database: "${info.Title}"`);
    const newMovie = {
        api_id: info.imdbID,
        title: info.Title,
        rating: info.Rated,
        genre: info.Genre,
        release_date: info.Released,
        image_url: info.Poster,
        runtime: info.Runtime,
        director: info.Director,
        writer: info.Writer,
        plot: info.Plot,
        year_released: info.Year,
        actors: info.Actors,
        awards: info.Awards,
        imdb_rating: info.imdbRating,
        imdb_votes: info.imdbVotes,
        earnings: info.BoxOffice,
    };
    return saveToDB("movies", newMovie);
}

async function getShowById(id) {
    const info = await queryMovieShow(id);
    if (info.Type !== "series") {
        throw new BadRequestError(
            "Wrong media type. The requested ID was a movie but you requested a show."
        );
    }
    console.log(`Show not found, adding show to database: "${info.Title}"`);
    const newShow = {
        api_id: info.imdbID,
        title: info.Title,
        rating: info.Rated,
        first_aired: info.Released,
        genre: info.Genre,
        writer: info.Writer,
        plot: info.Plot,
        actors: info.Actors,
        awards: info.Awards,
        episode_length: info.Runtime,
        image_url: info.Poster,
        years: info.Year,
        imdb_rating: info.imdbRating,
        imdb_votes: info.imdbVotes,
        seasons: info.totalSeasons,
    };
    const s = await saveToDB("shows", newShow);
    console.log("created show: ", s);
    return s;
}

/**
 * filterSong - Creates objects of the return data formatted for database and frontend.
 *
 * res => Response object to be formatted. Will contain song data.
 */
async function filterSong(res) {
    const songs = [];
    for (let song of res) {
        console.log(
            `Attempting to find song ${song.trackName} by ${song.artistName}`
        );
        const songInDB = await Song.find(song.trackId);
        if (songInDB) {
            console.log("Song found in database.");
            songs.push(songInDB);
        } else {
            const newSong = await getSongById(song.trackId);
            songs.push(newSong);
        }
    }
    return { songs };
}

/**
 * getSongById - Gets more information about a song.
 *
 * songId => ID of a song in iTunes's DB. Is obtained from initial search response object.
 */
async function getSongById(songId) {
    console.log("songID to be searched: ", songId);
    const res = await axios.request({
        method: "GET",
        url: itunes.songLookup + songId,
    });
    const song = res.data.results[0];
    console.log(
        `Song not found, adding song to database: "${song.trackName}" by ${song.artistName}`
    );
    const [release_date, year] = formatSongData(
        song.releaseDate,
        "release_date"
    );
    const newSong = {
        api_id: song.trackId,
        title: song.trackName,
        artist: song.artistName,
        song_length: formatSongData(song.trackTimeMillis, "song_length"),
        genre: song.primaryGenreName,
        album: song.collectionName || "N/A",
        release_date: release_date,
        year: year,
        image_url: formatSongData(song.artworkUrl100, "image_url"),
        preview: song.previewUrl,
    };
    return saveToDB("songs", newSong);
}

/**
 * Formats data recieved from itunes API.
 */

function formatSongData(data, type) {
    if (type === "song_length") {
        const totalSeconds = data / 1000;
        const seconds = Math.round(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);
        return `${minutes}:${seconds}`;
    } else if (type === "release_date") {
        const date = data.substring(0, 10);
        return convertDate(date);
    } else if (type === "image_url") {
        return data.substring(0, data.length - 13) + "1200x1200bb.jpg";
    }
}

function convertDate(date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    if (day[0] === "0") day = day[1];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const textMonth = months[month - 1];
    return [`${textMonth} ${day}, ${year}`, year];
}

/**
 * Gets rid of spaces in query, replacing them with "+" to make a query url friendly.
 */
function formatQuery(query) {
    return query.split(" ").join("+");
}

/**
 * searchAll - Main search function. Searches both databases and organizes data to be inserted to DB.
 *
 * term => Term to be searched for.
 */
async function searchAll(term) {
    console.log(`Search received. Searching for "${term}".`);
    const { movies } = await search(term, "movieShow");
    const { shows } = await search(term, "movieShow", true);
    const { songs } = await search(formatQuery(term), "itunes");
    return { movies, shows, songs };
}

module.exports = {
    searchAll,
    getSongById,
    getMovieById,
    getShowById,
};
