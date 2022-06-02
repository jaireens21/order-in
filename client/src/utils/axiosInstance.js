import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8010",
    //change to "" for deployment
});

export const TIMEOUT_INTERVAL = 60 * 1000; //for axios request
