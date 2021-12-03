const axios = require("axios");
const { API_KEY } = require("./config.js");
const { saveQuery, saveMovie, saveSong, saveShow } = require("./dbHandling.js");

const imdb = {
    url: "https://imdb8.p.rapidapi.com/title/find",
    host: "imdb8.p.rapidapi.com",
    movieLookup: "https://imdb8.p.rapidapi.com/title/get-details",
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

async function search(term, api) {
    const { url, host } = api === "imdb" ? imdb : genius;
    const options = {
        method: "GET",
        url: url,
        params: { q: term },
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
 * res => response object from an api request.
 *
 * api => api used to get the data (either imdb or genius), this is the condition for which filter function is used.
 */

async function organizeData(res, api) {
    if (api === "imdb") {
        return filterIMDB(res.results);
    } else if (api === "genius") {
        return filterGenius(res.response.hits);
    }
}

/**
 * filterIMDB - Creates objects of the return data formatted for database and frontend.
 *
 * res => response object to be formatted. Contains data for either a show or movie.
 *
 */
async function filterIMDB(res) {
    const showsArr = [];
    const moviesArr = [];
    for (let item of res) {
        if (item.titleType === "movie") {
            const newMovie = {
                id: item.id || "N/A",
                title: item.title || "N/A",
                release_year: item.year || "N/A",
                image_url: item.image_url || "N/A",
                runtime: item.runningTimeInMinutes || "N/A",
            };
            await saveMovie(newMovie);
            moviesArr.push(newMovie);
        } else if (
            item.titleType === "tvSeries" ||
            item.titleType === "tvMiniSeries"
        ) {
            const newShow = {
                id: item.id || "N/A",
                title: item.title || "N/A",
                start_year: item.seriesStartYear || "N/A",
                image_url: item.image.url || "N/A",
                episode_count: item.numberOfEpisodes || "N/A",
            };
            await saveShow(newShow);
            showsArr.push(newShow);
        }
    }
    return {
        movies: moviesArr,
        shows: showsArr,
    };
}

/**
 * filterGenius - Creates objects of the return data formatted for database and frontend.
 *
 * geniusRes => Response object to be formatted. Will contain song data.
 */
async function filterGenius(geniusRes) {
    const songsArr = [];
    for (let item of geniusRes) {
        try {
            const song = await getSongInfo(item.result.id);
            const newSong = {
                id: song.id,
                title: song.title_with_featured || "N/A",
                artist: song.primary_artist.name || "N/A",
                album: song.album.name || "N/A",
                release_date: song.release_date_for_display || "N/A",
                image_url: song.song_art_image_url || "N/A",
                link: song.media[0].url || "N/A",
            };
            await saveSong(newSong);
            songsArr.push(newSong);
        } catch (e) {
            console.error(
                `could not find more info on song ${item.result.title}. id: `,
                item.result.id
            );
        }
    }
    return { songs: songsArr };
}

/**
 * getSongInfo - Gets more information about a song.
 *
 * songId => ID of a song in genius's DB. Is obtained from initial search response object.
 */
async function getSongInfo(songId) {
    const res = await axios.request({
        method: "GET",
        url: `${genius.songLookup}/${songId}`,
        headers: {
            "x-rapidapi-host": genius.host,
            "x-rapidapi-key": API_KEY,
        },
    });
    return res.data.response.song;
}

/**
 * searchAll - Main search function. Searches both databases and organizes data to be inserted to DB.
 *
 * term => Term to be searched for.
 */
async function searchAll(term) {
    console.log(`Search received. Searching for "${term}".`);
    const { movies, shows } = await search(term, "imdb");
    const { songs } = await search(term, "genius");
    // console.log("movies: ", movies);
    console.log("shows: ", shows);
    // console.log("songs: ", songs);
    return { movies, shows, songs };
}

module.exports = searchAll;
