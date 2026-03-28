import useProducts from "../../hooks/useProducts";
import {
    Box,
    Container,
    Grid,
    Typography,
    Link
} from "@mui/material";
import Loader from "../../ui/loader/Loader";
import ProductCard from "../../ui/product/ProductCard";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Products() {
    const { t } = useTranslation();
    const { data, isLoading, isError, error } = useProducts(4);



    if (isLoading) return <Loader />;
    if (isError) return <Box color="red">{error.message}</Box>;

    return (
        <Box sx={{
            py: 10,
            backgroundColor: "background.default",
            color: "text.primary"
        }}>
            <Container maxWidth="lg">

                {/* HEADER */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 6
                    }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={700} sx={{
                            background: "linear-gradient(45deg,#a855f7,#ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            {t('Featured Products')}
                        </Typography>

                        <Typography color="text.secondary">
                            {t('featured_products_desc')}
                        </Typography>
                    </Box>

                    <Link
                        component={RouterLink}
                        to="/shop"
                        sx={{
                            color: "white",
                            fontWeight: 600,
                            textDecoration: "none",
                            bgcolor: "#c026d3",
                            p: 2,
                            borderRadius: 2
                        }}
                    >
                        {t('View All Products')} →
                    </Link>
                </Box>

                {/* PRODUCTS GRID */}
                <Grid container spacing={2}>
                    {data?.response?.data?.map((product) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>

                            <Link
                                component={RouterLink}
                                to={`/products/${product.id}`}
                                underline="none"
                                color="inherit"
                                sx={{ display: "block" }}
                            >
                                <ProductCard product={product} />
                            </Link>

                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );
}