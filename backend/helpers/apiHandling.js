const axios = require("axios");
const { API_KEY } = require("../config.js");
const { saveToDB } = require("./dbHandling.js");
const { BadRequestError } = require("./errorHandling.js");
const Show = require("../models/show");
const Movie = require("../models/movie");
const Song = require("../models/song");

const movieShow = {
    url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
    host: "movie-database-imdb-alternative.p.rapidapi.com",
};

const genius = {
    url: "https://genius.p.rapidapi.com/search",
    host: "genius.p.rapidapi.com",
    songLookup: "https://genius.p.rapidapi.com/songs",
};

/**
 * search - Manages requests so one request will search multiple tables and query multiple APIs correctly.
 *
 * term => the query to search
 *
 * api => which api to query
 */

async function search(term, api, isSeries = false) {
    const { url, host } = api === "genius" ? genius : movieShow;
    let params;
    if (api === "movieShow") {
        params = { s: term, r: "json", page: "1" };
        if (isSeries) {
            params.type = "series";
        } else {
            params.type = "movie";
        }
    } else {
        params = { q: term };
    }
    const options = {
        method: "GET",
        url: url,
        params: params,
        headers: {
            "x-rapidapi-host": host,
            "x-rapidapi-key": API_KEY,
        },
    };
    const res = await axios.request(options);
    return organizeData(res.data, api);
}

/**
 * organizeData - Sends response objects to the right filtering function.
 *
 * data => res.data response object from an api request.
 *
 * api => api used to get the data (either movieShow or genius), this is the condition for which filter function is used.
 */

async function organizeData(data, api) {
    if (api === "movieShow") {
        return filterMovieShow(data.Search);
    } else if (api === "genius") {
        return filterGenius(data.response.hits);
    }
}

/**
 * filterMovieShow - Creates objects of the return data formatted for database and frontend.
 *
 * res => response object to be formatted. Contains data for either a show or movie.
 *
 */
async function filterMovieShow(res) {
    console.log("filterMovieShow res: ");
    if (res[0].Type === "series") {
        const shows = [];
        for (let show of res) {
            const showInDB = await Show.find(show.imdbID);
            if (showInDB) {
                shows.push(showInDB);
            } else {
                const newShow = await getShowById(show.imdbID);
                shows.push(newShow);
            }
        }
        return { shows };
    }
    const movies = [];
    for (let movie of res) {
        const movieInDB = await Movie.find(movie.imdbID);
        if (movieInDB) {
            movies.push(movieInDB);
        } else {
            const newMovie = await getMovieById(movie.imdbID);
            movies.push(newMovie);
        }
    }
    return { movies };
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
    await saveToDB("movies", newMovie);
    return newMovie;
}

async function getShowById(id) {
    const show = await queryMovieShow(id);
    if (show.Type !== "series") {
        throw new BadRequestError(
            "Wrong media type. The requested ID was a movie but you requested a show."
        );
    }
    const info = await queryMovieShow(show.imdbID);
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
    await saveToDB("shows", newShow);
    return newShow;
}

/**
 * filterGenius - Creates objects of the return data formatted for database and frontend.
 *
 * geniusRes => Response object to be formatted. Will contain song data.
 */
async function filterGenius(geniusRes) {
    const songs = [];
    for (let song of geniusRes) {
        const songInDB = await Song.find(song.result.id);
        if (songInDB) {
            songs.push(songInDB);
        } else {
            const newSong = await getSongById(song.result.id);
            songs.push(newSong);
        }
    }
    return { songs };
}

/**
 * getSongById - Gets more information about a song.
 *
 * songId => ID of a song in genius's DB. Is obtained from initial search response object.
 */
async function getSongById(songId) {
    const res = await axios.request({
        method: "GET",
        url: `${genius.songLookup}/${songId}`,
        headers: {
            "x-rapidapi-host": genius.host,
            "x-rapidapi-key": API_KEY,
        },
    });
    const song = res.data.response.song;
    console.log("res.data.response.song: ", song);
    const newSong = {
        api_id: song.id,
        title: song.title,
        primary_artist: song.primary_artist.name,
        all_artists: song.artist_names,
        album: song.album ? song.album.name : null,
        release_date: song.release_date_for_display,
        image_url: song.song_art_image_url,
        embed: song.embed_content,
    };
    await saveToDB("songs", newSong);
    return newSong;
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
    const { songs } = await search(term, "genius");
    // const promises = [search(term, "movieShow"), search(term, "movieShow", true), search(term, "genius")];
    // const settled = await Promise.allSettled(promises);
    // console.log("Promie.allsettled: ", settled)
    return { movies, shows, songs };
}

module.exports = {
    searchAll,
    getSongById,
    getMovieById,
    getShowById,
};
