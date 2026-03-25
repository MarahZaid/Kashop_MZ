import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../api/axiosInstance';
import { useTranslation } from 'react-i18next';

export default function useProduct(id) {
    const { i18n } = useTranslation();
    const getProduct = async () => {
        const response = await axiosInstance.get(`/Products/${id}`);
        return response.data;
    };

    const query = useQuery({
        queryKey: ["product",i18n.language,id],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5
    });

    return query;
}