import useProducts from "../../hooks/useProducts";
import Box from "@mui/material/Box";
import Loader from "../../ui/loader/Loader";
import ProductCard from "../../ui/product/ProductCard"
import {
    Link
} from '@mui/material';
export default function Products() {

    const { data, isLoading, isError, error } = useProducts(2);
    if (isLoading) return <Loader />;
    if (isError) return <Box color={'red'}>{error.message}</Box>;

    console.log(data);


    return (
        <Box>
            {data?.response?.data?.map(product => (
                <Link to={`/product/${product.id}`}>
                <Box>{product.name}</Box>
                <ProductCard product={product}/>
                </Link>
            ))}
        </Box>
    );
}
