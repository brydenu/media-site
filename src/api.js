import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * The bridge between the front end and the back end.
 * Sends requests to the back end endpoints to get information and update database.
 */
class Backend {
    /**
     * searchAll: Main search method. Sends request to backend to search APIs using term
     *            from user. Request sent to /search/:term endpoint.
     *
     * term => Term to be searched. Taken from search bar in UI.
     *
     * Returns { movies: [], shows: [], songs: [] } where each array contains objects
     * formatted to be displayed by front end.
     */
    static async searchAll(term) {
        const res = await axios.get(`${BASE_URL}/search/${term}`);
        console.log("Search response: ", res);
        return res;
    }

    /**
     * getInfo: Gets more information about a media item to be displayed on
     *           solo page.
     *
     * mediaType => Type of media (song, movie, show)
     *
     * id => ID of media item.
     *
     * Returns media object containing all relevant information for solo page.
     */
    static async getInfo(mediaType, id) {
        const res = await axios.get(`${BASE_URL}/${mediaType}/${id}`);
        console.log("getInfo response: ", res.data[mediaType]);
        return res.data[mediaType];
    }
    /**
     * registerUser: Creates a user and adds them to the database.
     *
     * user => Object containing necessary user information. Validated in front end.
     *
     * Returns fulfilled user object.
     */
    static async registerUser(user) {
        const res = await axios.post(`${BASE_URL}/users/register`, user);
        return res.data.token;
    }

    /**
     * loginUser: Looks for user in database and attempts to match hashed passwords.
     *
     * user => Object containing username and password.
     *
     * Returns res object containing a token and a user object containing username, firstName, and lastName.
     */
    static async loginUser(user) {
        const res = await axios.post(`${BASE_URL}/users/login`, user);
        return res.data;
    }

    /**
     * updateUser: Updates a user with new information for firstName and/or lastName.
     *
     * user => Object containing username, password, and optional firstName and/or lastName.
     *
     * Returns updated user object.
     */
    static async updateUser(user) {
        const res = await axios.patch(
            `${BASE_URL}/users/${user.username}`,
            user
        );
        return res.data;
    }

    /**
     * logQuery: Logs the query and username if user is signed in to allow
     *           references to past searches.
     *
     * query => Query typed in by user.
     *
     * username => Current user's username if logged in.
     *
     * Returns object containing id of query.
     */
    static async logQuery(query, username) {
        const res = await axios.post(`${BASE_URL}/queries`, {
            query,
            username,
        });
        return res.data;
    }

    /**
     * getQueryHistory: Gets past queries of currently signed in user.
     *
     * username => User who's history to get.
     */
    static async getQueryHistory(username) {
        const res = await axios.get(`${BASE_URL}/queries/${username}`);
        return res.data;
    }
}

export default Backend;
