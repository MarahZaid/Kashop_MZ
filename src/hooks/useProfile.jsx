import { useQuery } from "@tanstack/react-query";
import authAxiosInstance from '../api/authAxiosInstance';
import { useTranslation } from 'react-i18next';

export default function useProfile() {
    const { i18n } = useTranslation(); 

    const getProfile = async () => {
        const response = await authAxiosInstance.get("/Profile");
        return response.data;
    };

    return useQuery({
        queryKey: ["profile", i18n.language], 
        queryFn: getProfile,
        staleTime: 1000 * 60 * 5
    });
}