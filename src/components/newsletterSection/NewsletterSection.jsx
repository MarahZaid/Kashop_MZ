import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Paper
} from "@mui/material";

import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeatureCard from "../../ui/FeatureCard";

export default function NewsletterSection() {
    return (
        <Box
  sx={{
    py: 12,
    color: "white",
    background: `
      radial-gradient(circle at 0% 50%, rgba(168,85,247,0.25), transparent 45%),
      radial-gradient(circle at 100% 80%, rgba(251,146,60,0.25), transparent 45%),
      linear-gradient(120deg,#0f172a,#0b132b,#1e1b4b)
    `
  }}
>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">

                    {/* LEFT SIDE */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Get 20% Off Your First Order
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.7)",
                                mb: 4,
                                maxWidth: 500
                            }}
                        >
                            Sign up for our newsletter and receive exclusive offers,
                            early access to new collections, and style inspiration.
                        </Typography>

                        {/* INPUT */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexDirection: { xs: "column", sm: "row" }
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder="Enter your email"
                                variant="outlined"
                                sx={{
                                    input: { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "rgba(255,255,255,0.05)"
                                    }
                                }}
                            />

                            <Button
                                variant="contained"
                                sx={{
                                    px: 4,
                                    background:
                                        "linear-gradient(90deg,#a855f7,#ec4899)"
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 2,
                                color: "rgba(255,255,255,0.5)"
                            }}
                        >
                            By subscribing, you agree to our Privacy Policy and consent to receive updates.
                        </Typography>
                    </Grid>

                    {/* RIGHT SIDE */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={3}>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<CardGiftcardOutlinedIcon />}
                                    title="Exclusive Offers"
                                    text="Get member-only discounts and early access to sales"
                                    color="#c084fc"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<AutoAwesomeOutlinedIcon />}
                                    title="New Arrivals First"
                                    text="Be the first to know about new collections"
                                    color="#fb923c"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<CheckCircleOutlineOutlinedIcon />}
                                    title="Free Returns"
                                    text="Extended 60-day returns for subscribers"
                                    color="#10b981"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<FavoriteBorderOutlinedIcon />}
                                    title="Style Tips"
                                    text="Curated looks and styling inspiration"
                                    color="#60a5fa"
                                />
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

