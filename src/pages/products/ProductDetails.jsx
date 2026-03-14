import useProduct from "../../hooks/useProduct";

import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Loader from "../../ui/loader/Loader";
export default function ProductDetails() {

    
    const {id} = useParams();
    const { data, isLoading, isError, error } = useProduct();
    if (isLoading) return <Loader />;
    if (isError) return <Box color={'red'}>{error.message}</Box>;
    console.log(data);

    return (
        <Box>
          
        </Box>
    );
}
