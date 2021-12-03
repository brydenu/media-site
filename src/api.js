import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Backend {
    static async searchAll(term) {
        const res = await axios.get(`${BASE_URL}/search/${term}`);
        console.log(res);
        return res;
    }
}

export default Backend;
