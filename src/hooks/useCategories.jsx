import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../api/axiosInstance';
import { useTranslation } from 'react-i18next';

export default function useCategories() {
    const { i18n } = useTranslation();
    
    const getCategories = async () => {
        const response = await axiosInstance.get("/Categories?limit=8");
        return response.data;
    };

    const query = useQuery({
        queryKey: ["categories", i18n.language],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
        enabled: i18n.isInitialized 

    
    });

    return query;
}