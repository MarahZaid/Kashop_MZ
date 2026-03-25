import useProduct from "../../hooks/useProduct";
import { useParams } from "react-router-dom";
import {
    Box, Container, Grid, Typography, Rating, Button,
    Divider, Stack, IconButton, Avatar, Paper
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Loader from "../../ui/loader/Loader";
import { useState } from "react";
import useAddToCart from "../../hooks/useAddToCart";
import { useTranslation } from 'react-i18next';

export default function ProductDetails() {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data, isLoading, isError, error } = useProduct(id);
    const [quantity, setQuantity] = useState(1);

    const { mutate: addToCart, isPending } = useAddToCart();

    if (isLoading) return <Loader />;
    if (isError) return <Box color={'red'} sx={{ p: 5 }}>{error.message}</Box>;

    const product = data.response;
    console.log(product);

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>

            <Grid container spacing={6} sx={{ mb: 10 }}>

                <Grid item size={{ xs: 12, md: 4 }}>
                    <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ width: '90%', borderRadius: '12px', bgcolor: '#f9f9f9' }}
                    />

                </Grid>


                <Grid item size={{ xs: 12, md: 8 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>{product.name || "Product Name"}</Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <Rating value={product.rate || 0} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary">
                            ({product.reviews?.length || 0} {t('reviews')})
                        </Typography>
                    </Stack>

                    <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3 }}>
                        ${product.price}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.5 }}>
                        {product.description || t('default_product_desc')}
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Grid container spacing={2} alignItems="center">

                        <Grid item size={{ xs: 12, sm: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                                    <RemoveIcon />
                                </IconButton>

                                <Typography sx={{ px: 2 }}>{quantity}</Typography>

                                <IconButton onClick={() => setQuantity(q => q + 1)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </Grid>

                        <Grid item size={{ xs: 12, sm: 8 }}>
                            <Button
                            disabled={isPending}
                                fullWidth
                                variant="contained"
                                startIcon={<ShoppingBagOutlinedIcon />}
                                sx={{
                                    bgcolor: '#c026d3',
                                    '&:hover': { bgcolor: '#9d1cae' },
                                    py: 1.5,
                                    textTransform: 'none'
                                }}
                                onClick={() => addToCart({
                                    ProductId: product.id,
                                    Count: quantity
                                })}
                            >
                                {t('Add to Cart')}
                            </Button>
                        </Grid>

                        <Grid item size={{ xs: 1, sm: 1 }}>
                            <IconButton
                                sx={{
                                    border: '1px solid #ddd',
                                    p: 1.5,
                                    width: '100%'
                                }}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
                      {t('Customer Reviews')} ({product.reviews?.length || 0})
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={4}>
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((rev, idx) => (
                            <Grid item size={{ xs: 12 }} key={idx}>
                                <Paper elevation={0} sx={{ p: 3, bgcolor: '#F9FAFB', borderRadius: '12px' }}>
                                    <Stack direction="row" spacing={2} alignItems="flex-start">
                                        <Avatar sx={{ bgcolor: '#c026d3' }}>{rev.userName.charAt(0).toUpperCase()}</Avatar>
                                        <Box sx={{ width: '100%' }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {rev.userName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {new Date(rev.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </Stack>
                                            <Rating value={rev.rating} size="small" readOnly sx={{ my: 0.5 }} />
                                            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                                                {rev.comment}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item size={{ xs: 12 }}>
                            <Typography color="text.secondary">{t('No reviews yet')}</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
}