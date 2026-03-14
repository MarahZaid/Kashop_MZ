import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../api/axiosInstance';

export default function useProducts(limit=10) {
    const getProducts = async () => {
        const response = await axiosInstance.get(`/Products?limit=${limit}`);
        return response.data;
    };

    const query = useQuery({
        queryKey: ["products","en",limit],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5
    });

    return query;
}