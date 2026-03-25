

import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../api/axiosInstance';
import { useTranslation } from 'react-i18next';

export default function useProducts(params = {}) {
    const { i18n } = useTranslation();
    const {
        limit = 10,
        page = 1,
        category = "",
        minPrice = "",
        maxPrice = "",
        sortBy = "",
        ascending = true,
        search = "",
    } = params;

    const getProducts = async () => {
        const query = new URLSearchParams();
        query.append("page", page);
        query.append("limit", limit);
        if (sortBy) query.append("sortBy", sortBy);
        if (sortBy) query.append("ascending", ascending);
        if (minPrice !== "") query.append("minPrice", minPrice);
        if (maxPrice !== "") query.append("maxPrice", maxPrice);
        if (search) query.append("search", search);

        const url = category
            ? `/Products/category/${category}?${query.toString()}`
            : `/Products?${query.toString()}`;

        const response = await axiosInstance.get(url);
        return response.data;
    };

    return useQuery({
        queryKey: ["products",i18n.language, page, limit, category, minPrice, maxPrice, sortBy, ascending, search],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
    });
}