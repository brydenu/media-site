const axios = require("axios");
// const Movie = require("./models/movie");
// const Show = require("./models/show");
// const Song = require("./models/song");
const API_KEY = process.env.SECRET_KEY;

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

// Manages requests so one request will search multiple tables and
// query multiple APIs correctly.

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

function organizeData(res, api) {
    if (api === "imdb") {
        return filterIMDB(res.results);
    } else if (api === "genius") {
        return filterGenius(res.response.hits);
    }
}

// Creates objects of the return data that is easier inserted to the DB
function filterIMDB(res) {
    const showsArr = [];
    const moviesArr = [];
    for (let item of res) {
        if (item.titleType === "movie") {
            const newMovie = {
                id: item.id || "N/A",
                title: item.title || "N/A",
                release_year: item.year || "N/A",
                image_url: item.image.url || "N/A",
                runtime: item.runningTimeInMinutes || "N/A",
            };
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
            showsArr.push(newShow);
        }
    }
    return {
        movies: moviesArr,
        shows: showsArr,
    };
}

// Creates objects of the return data that is easier inserted to the DB
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
            songsArr.push(newSong);
        } catch (e) {
            console.log(
                "could not find information on this song with id: ",
                item.result.id
            );
        }
    }
    return { songs: songsArr };
}

// Gets more information about a song, since the normal find-song endpoint isn't as detailed.
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

// Main search function- searches both databases and organizes data to be inserted to DB.
async function searchAll(term) {
    const { movies, shows } = await search(term, "imdb");
    const { songs } = await search(term, "genius");
    console.log("movies: ", movies);
    console.log("shows: ", shows);
    console.log("songs: ", songs);
    return { movies, shows, songs };
}

module.exports = searchAll;
