import axios from "axios";

const api = axios.create({
    // baseURL: 'http://localhost:5000/api/v1/',
    baseURL: 'https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;