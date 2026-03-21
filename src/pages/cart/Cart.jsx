import {
    Box, Container, Grid, Typography, Button,
    Divider, Paper, Link
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import CartItem from "./CartItem";
import Loader from "../../ui/loader/Loader";

export default function Cart() {
    const { data, isLoading, isError, error } = useCart();
    const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart();
    const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem();

    const items = data?.items || [];
    const cartTotal = data?.cartTotal || 0;

    if (isLoading) return <Loader />;
    if (isError) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
            <Typography color="error">{error.message}</Typography>
        </Box>
    );

    if (items.length === 0) return (
        <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: "#e2e8f0" }} />
            <Typography variant="h5" fontWeight={700}>Your cart is empty</Typography>
            <Typography color="text.secondary">Looks like you haven't added anything yet.</Typography>
            <Button
                component={RouterLink} to="/shop" variant="contained"
                sx={{ mt: 1, bgcolor: "#c026d3", borderRadius: 2, textTransform: "none", fontWeight: 600, px: 4, "&:hover": { bgcolor: "#a21caf" } }}
            >
                Start Shopping
            </Button>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", pt: 8, pb: 10 }}>
            <Container maxWidth="lg">

                {/* HEADER */}
                <Box sx={{ mb: 4 }}>
                   
                    <Typography variant="h4" fontWeight={800}>Shopping Cart</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {items.length} {items.length === 1 ? "item" : "items"} in your cart
                    </Typography>
                </Box>

                <Grid container spacing={4}>

                    {/* ITEMS */}
                    <Grid item size={{xs:12, md:8}}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {items.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    onRemove={removeItem}
                                    onUpdate={updateItem}
                                    isRemoving={isRemoving}
                                    isUpdating={isUpdating}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* ORDER SUMMARY */}
                    <Grid item size={{xs:12, md:4}}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", position: "sticky", top: 100 }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>Order Summary</Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary">Subtotal</Typography>
                                    <Typography fontWeight={600}>${cartTotal}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary">Shipping</Typography>
                                    <Typography fontWeight={600} color="success.main">Free</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2.5 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                                <Typography fontWeight={700} fontSize={17}>Total</Typography>
                                <Typography fontWeight={800} fontSize={20}>${cartTotal}</Typography>
                            </Box>

                            <Button fullWidth variant="contained" size="large"
                                sx={{
                                    bgcolor: "#c026d3", borderRadius: 2.5, py: 1.5,
                                    fontWeight: 700, textTransform: "none", fontSize: 15,
                                    boxShadow: "0 4px 15px rgba(192,38,211,0.3)",
                                    "&:hover": { bgcolor: "#a21caf" }
                                }}
                            >
                                Proceed to Checkout
                            </Button>

                            <Button fullWidth component={RouterLink} to="/shop"
                                sx={{ mt: 1.5, color: "#64748b", textTransform: "none", fontWeight: 600, "&:hover": { color: "#c026d3" } }}
                            >
                                Continue Shopping
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}