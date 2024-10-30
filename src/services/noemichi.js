import axios from "axios";

const NoemichiService = axios.create({
    baseURL: 'https://pruebanode-victorglez97-victorglez97s-projects.vercel.app/api/v1/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default NoemichiService;