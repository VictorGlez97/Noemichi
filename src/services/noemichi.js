import axios from "axios";

const NoemichiService = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default NoemichiService;