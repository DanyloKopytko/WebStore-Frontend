import axios from "axios";

export default async function post (url, data) {
    return await axios.post(url, data);
}