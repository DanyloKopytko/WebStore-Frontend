import axios from "axios";

export default async function post (url, data, headers) {
    return await axios.post(url, data, headers);
}