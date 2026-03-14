import Box from "@mui/material/Box";
import Loader from "../../ui/loader/Loader";

import useCategories from "../../hooks/useCategories";

export default function CategoriesPage() {

    const { data, isLoading, isError, error } = useCategories();
    console.log(data);

    if (isLoading) return <Loader />;
    if (isError) return <Box color={'red'}>{error.message}</Box>;

    

    return (
        <Box>
            {data.response.data.map(category => (
                <Box>{category.name}</Box>
            ))}
        </Box>
    );
}
