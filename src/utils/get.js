import axios from 'axios';

export default async function post (url, headers) {
    return await axios.get(url, headers);
};