import {
    Box, Container, Grid, Typography, Button,
    Divider, Paper, Link, Dialog, DialogTitle,
    DialogContent, DialogActions, RadioGroup,
    FormControlLabel, Radio
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCartItem";
import useCheckout from "../../hooks/useCheckout";
import CartItem from "./CartItem";
import Loader from "../../ui/loader/Loader";
import { useTranslation } from 'react-i18next';

export default function Cart() {
    const { t } = useTranslation();
    const { data, isLoading, isError, error } = useCart();
    const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart();
    const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem();
    const { mutate: checkout, isPending: isCheckingOut } = useCheckout();

    const [openDialog, setOpenDialog] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Visa");

    const items = data?.items || [];
    const cartTotal = data?.cartTotal || 0;

    const handleCheckout = () => {
        checkout(paymentMethod, {
            onSuccess: () => setOpenDialog(false)
        });
    };

    if (isLoading) return <Loader />;
    if (isError) return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
            <Typography color="error">{error.message}</Typography>
        </Box>
    );

    if (items.length === 0) return (
        <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: "divider" }} />
            <Typography variant="h5" fontWeight={700}>{t('Your cart is empty')}</Typography>
            <Typography color="text.secondary">{t('cart_empty_desc')}</Typography>
            <Button
                component={RouterLink} to="/shop" variant="contained"
                sx={{ mt: 1, bgcolor: "primary.main", borderRadius: 2, textTransform: "none", fontWeight: 600, px: 4, "&:hover": { bgcolor: "#a21caf" } }}
            >
                {t('Start Shopping')}
            </Button>
        </Box>
    );

    return (
        <Box sx={{ minHeight: "100vh", pt: 8, pb: 10 }}>
            <Container maxWidth="lg">

                {/* HEADER */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight={700}>{t('Shopping Cart')}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {items.length} {items.length === 1 ? t('item') : t('items')} {t('in your cart')}
                    </Typography>
                </Box>

                <Grid container spacing={4}>

                    {/* ITEMS */}
                    <Grid item size={{ xs: 12, md: 8 }}>
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
                    <Grid item size={{ xs: 12, md: 4 }}>
                        <Paper elevation={0} sx={{
                            p: 3, borderRadius: 3, borderTop: "1px solid",
                            borderBottom: "1px solid",
                            borderColor: "divider", position: "sticky", top: 100
                        }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>{t('Order Summary')}</Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary">{t('Subtotal')}</Typography>
                                    <Typography fontWeight={600}>${cartTotal}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color="text.secondary">{t('Shipping')}</Typography>
                                    <Typography fontWeight={600} color="success.main">{t('Free')}</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2.5 }} />

                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                                <Typography fontWeight={700} fontSize={17}>{t('Total')}</Typography>
                                <Typography fontWeight={800} fontSize={20}>${cartTotal}</Typography>
                            </Box>

                            <Button
                                fullWidth variant="contained" size="large"
                                onClick={() => setOpenDialog(true)}
                                sx={{
                                    bgcolor: "primary.main", borderRadius: 2.5, py: 1.5,
                                    fontWeight: 700, textTransform: "none", fontSize: 15,
                                    boxShadow: "0 4px 15px rgba(192,38,211,0.3)",
                                    "&:hover": { bgcolor: "primary.dark" }
                                }}
                            >
                                {t('Proceed to Checkout')}
                            </Button>

                            <Button fullWidth component={RouterLink} to="/shop"
                                sx={{ mt: 1.5, color: "#64748b", textTransform: "none", fontWeight: 600, "&:hover": { color: "primary.main" } }}
                            >
                                {t('Continue Shopping')}
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* PAYMENT DIALOG */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{ sx: { borderRadius: 3, minWidth: 360, p: 1 } }}
            >
                <DialogTitle sx={{ fontWeight: 700, fontSize: 18 }}>
                    {t('Select Payment Method')}
                </DialogTitle>

                <DialogContent>
                    <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        {/* VISA */}
                        <Paper
                            onClick={() => setPaymentMethod("Visa")}
                            elevation={0}
                            sx={{
                                p: 2, mb: 1.5, borderRadius: 2, cursor: "pointer",
                                border: paymentMethod === "Visa" ? "2px solid primary.main" : "1px solid divider",
                                backgroundColor: (theme) => theme.palette.mode === "dark" ? (paymentMethod === "Visa" ? "rgba(192,38,211,0.1)" : "background.paper") : "#fdf4ff",
                                display: "flex", alignItems: "center", gap: 2,
                                transition: "0.2s"
                            }}
                        >
                            <CreditCardIcon sx={{ color: paymentMethod === "Visa" ? "primary.main" : "#94a3b8" }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={600}>Visa</Typography>
                                <Typography variant="body2" color="text.secondary">{t('Pay with credit/debit card')}</Typography>
                            </Box>
                            <FormControlLabel value="Visa" control={<Radio sx={{ color: "primary.main", "&.Mui-checked": { color: "primary.main" } }} />} label="" />
                        </Paper>

                        {/* CASH */}
                        <Paper
                            onClick={() => setPaymentMethod("Cash")}
                            elevation={0}
                            sx={{
                                p: 2, borderRadius: 2, cursor: "pointer",
                                border: paymentMethod === "Cash" ? "2px solid primary.main" : "1px solid divider",
                                
                                backgroundColor: (theme) => theme.palette.mode === "dark" ? (paymentMethod === "Cash" ? "rgba(192,38,211,0.1)" : "background.paper") : "#fdf4ff",
                                display: "flex", alignItems: "center", gap: 2,
                                transition: "0.2s"
                            }}
                        >
                            <MoneyIcon sx={{ color: paymentMethod === "Cash" ? "primary.main" : "#94a3b8" }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography fontWeight={600}>Cash</Typography>
                                <Typography variant="body2" color="text.secondary">{t('Pay on delivery')}</Typography>
                            </Box>
                            <FormControlLabel value="Cash" control={<Radio sx={{ color: "primary.main", "&.Mui-checked": { color: "primary.main" } }} />} label="" />
                        </Paper>
                    </RadioGroup>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                    <Button
                        onClick={() => setOpenDialog(false)}
                        sx={{ color: "#64748b", textTransform: "none", fontWeight: 600 }}
                    >
                        {t('Cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        disabled={isCheckingOut}
                        onClick={handleCheckout}
                        sx={{
                            bgcolor: "primary.main", borderRadius: 2, px: 3,
                            textTransform: "none", fontWeight: 700,
                            "&:hover": { bgcolor: "primary.dark" }
                        }}
                    >
                        {isCheckingOut ? t('Processing...') : t('Confirm Order')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}