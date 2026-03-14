import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import useCart from "../../hooks/useCart";



export default function Cart() {

    const { data, isLoading, isError, error } = useCart();
    console.log(data);
  
    

    return (
        <Box>
            Cart
        </Box>
    );
}
