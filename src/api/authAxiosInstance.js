import axios from "axios";
import i18n from "../i18next";
import { useAuthStore } from "../store/useAuthStore";

const authAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});


authAxiosInstance.interceptors.request.use((config) => {
    const { token } = useAuthStore.getState();
    config.headers["Accept-Language"] = i18n.language;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

authAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/Account/RefreshToken`,
                    {},
                    { withCredentials: true }
                );

                console.log("Refresh Token");
                const newAccessToken = refreshResponse.data.accessToken;

                useAuthStore.getState().setToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                console.log("after");
                console.log(token);
                return authAxiosInstance(originalRequest);
            } catch (error) {

            }
        }

        return Promise.reject(error);
    }
);

export default authAxiosInstance;