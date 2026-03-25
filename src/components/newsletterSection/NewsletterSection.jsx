import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Paper
} from "@mui/material";
import { useTranslation } from 'react-i18next';

import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FeatureCard from "../../ui/FeatureCard";

export default function NewsletterSection() {
    const { t } = useTranslation();
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
                            {t('newsletter_title')}
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.7)",
                                mb: 4,
                                maxWidth: 500
                            }}
                        >
                            {t('newsletter_desc')}
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
                                placeholder={t('Enter your email')}
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
                                {t('Subscribe')}
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            sx={{
                                mt: 2,
                                color: "rgba(255,255,255,0.5)"
                            }}
                        >
                            {t('newsletter_privacy')}
                        </Typography>
                    </Grid>

                    {/* RIGHT SIDE */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={3}>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<CardGiftcardOutlinedIcon />}
                                    title={t('Exclusive Offers')} text={t('exclusive_offers_desc')}
                                    color="#c084fc"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<AutoAwesomeOutlinedIcon />}
                                    title={t('New Arrivals First')} text={t('new_arrivals_desc')}
                                    color="#fb923c"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<CheckCircleOutlineOutlinedIcon />}
                                    title={t('Free Returns')} text={t('free_returns_desc')}
                                    color="#10b981"
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FeatureCard
                                    icon={<FavoriteBorderOutlinedIcon />}
                                    title={t('Style Tips')} text={t('style_tips_desc')}
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

