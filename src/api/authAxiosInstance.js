import axios from "axios";

const authAxiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
    headers: {
        'Accept-Language': 'en',
    }
});

authAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default authAxiosInstance;