import useProducts from "../../hooks/useProducts";
import Box from "@mui/material/Box";
import Loader from "../../ui/loader/Loader";
import {
    Link
} from '@mui/material';
export default function Shop() {

    const { data, isLoading, isError, error } = useProducts();
    if (isLoading) return <Loader />;
    if (isError) return <Box color={'red'}>{error.message}</Box>;

    console.log(data);


    return (
        <Box>
            {data?.response?.data?.map(product => (
                <Link to={`/products/${product.id}`}>
                <Box>{product.name}</Box>
                </Link>
            ))}
        </Box>
    );
}
