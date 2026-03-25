import axios from "axios";
import i18n from "../i18next";

const authAxiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
});

authAxiosInstance.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18n.language;
    
    const token = localStorage.getItem("accesstoken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default authAxiosInstance;