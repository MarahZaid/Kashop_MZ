import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TikTokIcon from "@mui/icons-material/MusicNote";
import siteIcon from '../../assets/siteIcon.png';

import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <Box
            component="footer"
            sx={{
                
                backgroundColor: "#f9fafb",
                borderTop: "1px solid #e0e0e0"
            }}
        >
            <Container sx={{ py: 7 }}>
                <Grid container spacing={4}>

                    {/* Logo + Description */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                textDecoration: 'none',
                                py: 2
                            }}
                        >
                            <Box
                                component="img"
                                src={siteIcon}
                                alt="KaShop logo"
                                sx={{
                                    width: { xs: 20, md: 26 },
                                    height: { xs: 20, md: 26 },
                                }}
                            />

                            <Typography
                                component={RouterLink}
                                to="/"
                                variant="h5"
                                sx={{
                                    position: 'relative',
                                    textDecoration: 'none',
                                    color: 'black',
                                    fontSize: { xs: '1rem', md: '1.4rem' },
                                    fontWeight: 700,
                                    
                                }}
                            >
                                KASHOP
                            </Typography>
                        </Box>


                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {t('footer_desc')}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton size="small"><InstagramIcon /></IconButton>
                            <IconButton size="small"><FacebookIcon /></IconButton>
                            <IconButton size="small"><PinterestIcon /></IconButton>
                            <IconButton size="small"><TikTokIcon /></IconButton>
                        </Box>
                    </Grid>

                    {/* Shop */}
                    <Grid size={{ xs: 12, md: 3}}>
                        <Typography fontWeight={600} gutterBottom>
                            {t('Shop')}
                        </Typography>

                        <FooterLink to="/shop">{t('Clothing')}</FooterLink>
                        <FooterLink to="/shop">{t('Accessories')}</FooterLink>
                        <FooterLink to="/shop">{t('Footwear')}</FooterLink>
                        <FooterLink to="/shop">{t('Bags')}</FooterLink>
                        <FooterLink to="/shop">{t('Jewelry')}</FooterLink>
                        <FooterLink to="/shop">
                            {t('Sale')}
                        </FooterLink>
                    </Grid>

                    {/* Help */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        {/* Help */}
        <Typography fontWeight={600} gutterBottom>{t('Help')}</Typography>
        <FooterLink to="/">{t('FAQ')}</FooterLink>
        <FooterLink to="/">{t('Shipping & Returns')}</FooterLink>
        <FooterLink to="/">{t('Size Guide')}</FooterLink>
        <FooterLink to="/">{t('Contact Us')}</FooterLink>
        <FooterLink to="/">{t('Track Order')}</FooterLink>
                    </Grid>

                    {/* About */}
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Typography fontWeight={600} gutterBottom>{t('About')}</Typography>
        <FooterLink to="/">{t('Our Story')}</FooterLink>
        <FooterLink to="/">{t('Sustainability')}</FooterLink>
        <FooterLink to="/">{t('Careers')}</FooterLink>
        <FooterLink to="/">{t('Press')}</FooterLink>
                    </Grid>

                </Grid>
            </Container>

            <Box
                sx={{
                    borderTop: "1px solid #e0e0e0",
                    py: 2,
                    textAlign: "center"
                }}
            >
                <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} KaShop. {t('All rights reserved.')}
        </Typography>
            </Box>
        </Box>
    );
}

function FooterLink({ children, to, sx }) {
    return (
        <Link
            component={RouterLink}
            to={to}
            underline="none"
            color="text.secondary"
            sx={{
                display: "block",
                mb: 1,
                fontSize: 14,
                "&:hover": {
                    color: "#c026d3"
                },
                
            }}
        >
            {children}
        </Link>
    );
}