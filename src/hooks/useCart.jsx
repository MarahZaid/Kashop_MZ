import { useQuery } from "@tanstack/react-query";
import authAxiosInstance from '../api/authAxiosInstance';
import { useTranslation } from 'react-i18next';

export default function useCart() {
    const { i18n } = useTranslation(); 

    const getItem = async () => {
        const response = await authAxiosInstance.get("/Carts");
        return response.data;
    };

    return useQuery({
        queryKey: ["carts", i18n.language], 
        queryFn: getItem,
        staleTime: 1000 * 60 * 5
    });
}