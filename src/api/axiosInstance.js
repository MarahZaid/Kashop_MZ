import axios from "axios";
import i18n from "../i18next";

const axiosInstance = axios.create({
    baseURL: 'https://knowledgeshop.runasp.net/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const lang = i18n.language || localStorage.getItem('i18nextLng') || 'en';
    config.headers["Accept-Language"] = lang;
    return config;
});

export default axiosInstance;