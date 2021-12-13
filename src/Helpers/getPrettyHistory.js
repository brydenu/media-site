import Backend from "../api";

export default async function getPrettyHistory(queries) {
    const data = [];
    for (let query of queries) {
        const queryData = {};
        const movieData = [];
        const showData = [];
        const songData = [];
        if (query.topMovies) {
            const movieIds = query.topMovies.split(".");
            for (let id of movieIds) {
                const info = await Backend.getInfoDB("movie", id);
                movieData.push(info);
            }
        }
        if (query.topShows) {
            const showIds = query.topShows.split(".");
            for (let id of showIds) {
                const info = await Backend.getInfoDB("show", id);
                showData.push(info);
            }
        }
        if (query.topSongs) {
            const songIds = query.topSongs.split(".");
            for (let id of songIds) {
                const info = await Backend.getInfoDB("song", id);
                songData.push(info);
            }
        }
        queryData.movies = movieData;
        queryData.shows = showData;
        queryData.songs = songData;
        queryData.term = query.term;
        data.push(queryData);
    }
    return data;
}
