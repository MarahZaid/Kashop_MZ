import { Box, Container, Typography, Button, Stack, Paper } from "@mui/material";
import hero_pg from "../../assets/hero-pg.jpg"
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function HeroSection() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: { xs: "80vh", md: "90vh" },
                backgroundImage: `url(${hero_pg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                color: "white",
                pt: { xs: 6, sm: 12, md: 0 }, 
            pb: { xs: 6, sm: 12, md: 0 }, 
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3))",
                }}
            />

            {/* Content */}
            <Container sx={{ position: "relative", zIndex: 2 }}>
                <Stack spacing={3} maxWidth="600px">

                    {/* Badge */}
                    <Box
                        sx={{
                            bgcolor: "rgba(255,255,255,0.1)",
                            px: 2,
                            py: 1,
                            borderRadius: "20px",
                            width: "fit-content",
                            backdropFilter: "blur(6px)",
                           
                        }}
                    >
                        <Typography variant="caption">
                            {t('New Collection 2026')}
                        </Typography>
                    </Box>

                    {/* Title */}
                    <Typography fontWeight="bold"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.8rem", md: "3.75rem" },
                            lineHeight: 1,
                        }}>
                        {t('Elevate Your')} <br />
                        <Box component="span" sx={{
                            background: "linear-gradient(45deg,#a855f7,#ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            {t('KaShop Style')}
                        </Box>
                    </Typography>

                    {/* Description */}
                    <Typography variant="body1" color="rgba(255,255,255,0.8)">
                        {t('hero_desc')}
                    </Typography>

                    {/* Buttons */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems={{ xs: "stretch", sm: "center" }}
                    >
                        <Button
                            size="large"
                            sx={{
                                background: "linear-gradient(45deg,#a855f7,#ec4899)",
                                color: "white",
                                px: 3,
                                '&:hover': {
                                    background: "linear-gradient(45deg,#9333ea,#db2777)",
                                }
                            }}
                            onClick={() => navigate("/shop")}
                        >
                            {t('Shop Now')}
                        </Button>

                        <Button variant="outlined" size="large" color="inherit"
                            onClick={() =>
                                document.getElementById("categories")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }>
                            {t('Browse Categories')}
                        </Button>
                    </Stack>

                    {/* Stats */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 2, sm: 6 }}
                        mt={4}
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="bold">50K+</Typography>
                            <Typography variant="body2" color="grey.400">{t('Happy Customers')}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">4.9★</Typography>
                            <Typography variant="body2" color="grey.400">{t('Average Rating')}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">500+</Typography>
                            <Typography variant="body2" color="grey.400">{t('Products')}</Typography>
                        </Box>
                    </Stack>

                </Stack>
            </Container>

            {/* Right Feature Cards */}
            <Box
                sx={{
                    position: "absolute",
                    right: { sm: 80, md: 100 },
                    bottom: 60,
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    gap: 2,
                    zIndex: 2,
                }}
                
            >
                <FeatureCard title={t('Free Shipping')} desc={t('free_shipping_desc')} />
                <FeatureCard title={t('Secure Checkout')} desc={t('secure_checkout_desc')} />
            </Box>
        </Box>
    );
}

function FeatureCard({ title, desc }) {
    return (
        <Paper
            sx={{
                p: 2,
                width: 240,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
            }}
        >
            <Typography fontWeight="bold">{title}</Typography>
            <Typography variant="body2" color="grey.300">
                {desc}
            </Typography>
        </Paper>
    );
}