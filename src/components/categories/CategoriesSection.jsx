import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";

import Loader from "../../ui/loader/Loader";
import useCategories from "../../hooks/useCategories";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function CategoriesSection() {
    const { t } = useTranslation();
    const { data, isLoading, isError, error } = useCategories();

    if (isLoading) return <Loader />;
    if (isError) return <Box color="red">{error.message}</Box>;

    const categories = data.response.data;

    return (
        <Box sx={{ pb: 10 }}>
            <Container maxWidth="lg">

                {/* Title */}
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography variant="h4" fontWeight={700}>
                        {t('Shop by Category')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('Browse all product categories')}
                    </Typography>
                </Box>

                {/* Grid Container */}
                <Grid container spacing={6}>
                    {data.response.data.map((category) => (
                        <Grid
                            item
                            key={category.id}
                            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    height: "100%",
                                    py: 5,
                                    textAlign: "center",
                                    background: (theme) =>
                                        theme.palette.mode === "dark"
                                            ? "linear-gradient(135deg, #3b0764, #4a044e)"
                                            : "linear-gradient(135deg, #fdf2f8, #f3e8ff)",
                                    transition: "0.3s",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                    variant="h4"
                                       
                                        fontWeight={700}
                                        fontSize="1.2rem"
                                        color="text.primary"  
                                    >
                                        {category.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}