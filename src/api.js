import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Backend {
    static async searchAll(term) {
        const res = axios.get(`${BASE_URL}/search/${term}`);
        console.log(res);
    }
}

export default Backend;
