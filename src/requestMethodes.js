import axios from "axios";
const BASE_URL = "http://localhost:8001/api/";
const TOKEN = "123"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})