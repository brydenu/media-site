function getIds(arr, time) {
    let ids = [];
    let count = 0;
    while (count < 3 && count < arr.length) {
        ids.push(arr[count].id);
        count++;
    }
    return ids;
}

async function makeTopResults(topMovies, topShows, topSongs) {
    const songs = topSongs ? getIds(topSongs).join(".") : "";
    const movies = topMovies ? getIds(topMovies).join(".") : "";
    const shows = topShows ? getIds(topShows).join(".") : "";
    return { movies, shows, songs };
}

export default makeTopResults;
