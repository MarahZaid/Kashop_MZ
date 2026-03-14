import React from 'react'
import { useQuery } from "@tanstack/react-query";
import authAxiosInstance from '../api/authAxiosInstance';

export default function useCart() {
    const getItem = async () => {
        const response = await authAxiosInstance.get("/Carts");
        return response.data;
    };

    const query = useQuery({
        queryKey: ["carts"],
        queryFn: getItem,
        staleTime: 1000 * 60 * 5
    });

    return query;
}