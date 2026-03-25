import {
    AppBar, Box, Toolbar, Typography, IconButton,
    Link, Badge, Menu, MenuItem, ListItemIcon, Divider,
    Drawer, List, ListItemButton, ListItemText, Button
} from '@mui/material';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import siteIcon from '../../assets/siteIcon.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuthStore } from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { data: cartData } = useCart();
    const cartCount = cartData?.items?.length || 0;

    const changeLanguage = () => {
        const newLng = i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(newLng);
    };

    const handleUserClick = (e) => {
        token ? setAnchorEl(e.currentTarget) : navigate("/login");
    };

    const handleLogout = () => {
        logout();
        setAnchorEl(null);
        navigate("/login");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="transparent" elevation={0} sx={{ py: 2, backgroundColor: "rgba(255,255,255)" }}>
                <Container sx={{ width: '100%', maxWidth: 1200 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>

                        {/* LOGO */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton size="large" edge="start" color="inherit" onClick={() => setOpen(true)} sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <MenuIcon />
                            </IconButton>
                            <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
                                <Box component="img" src={siteIcon} alt="KaShop logo" sx={{ width: { xs: 22, md: 28 }, height: { xs: 22, md: 28 } }} />
                                <Typography component={RouterLink} to="/" variant="h5" sx={{
                                    position: 'relative', textDecoration: 'none', color: 'black',
                                    fontSize: { xs: '1.1rem', md: '1.5rem' }, fontWeight: 700,
                                    '&::after': { content: '""', position: 'absolute', left: 0, bottom: 2, width: '99%', height: '2px', backgroundColor: '#fb9b2d', borderRadius: 4 }
                                }}>
                                    KASHOP
                                </Typography>
                            </Box>
                        </Box>

                        {/* NAV LINKS */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                            <Link component={RouterLink} to={'/'} color="inherit" underline='none'>{t('Home')}</Link>
                            <Link component={RouterLink} to={'/shop'} color="inherit" underline='none'>{t('Shop')}</Link>
                            <Link component={RouterLink} to={'/about'} color="inherit" underline='none'>{t('About')}</Link>
                            <Link component={RouterLink} to={'/'} color="inherit" underline='none'>{t('Contact')}</Link>
                        </Box>

                        {/* ICONS */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            {/* LANGUAGE TOGGLE */}
                            <Button
                                onClick={changeLanguage}
                                size="small"
                                sx={{
                                    minWidth: 40, fontWeight: 700, fontSize: 13,
                                    color: "#c026d3", border: "1px solid #e879f9",
                                    borderRadius: 2, px: 1.5, py: 0.5, mr: 0.5,
                                    "&:hover": { bgcolor: "#fdf4ff" }
                                }}
                            >
                                {i18n.language === "ar" ? "EN" : "AR"}
                            </Button>

                            <IconButton size="small" sx={{ p: { xs: 0.5, md: 1 } }} color="inherit">
                                <DarkModeOutlinedIcon />
                            </IconButton>

                            {/* USER */}
                            <IconButton size="small" sx={{ p: { xs: 0.5, md: 1 }, color: token ? "#c026d3" : "inherit" }} onClick={handleUserClick}>
                                <PersonOutlineIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                PaperProps={{ sx: { mt: 1, minWidth: 160, borderRadius: 3 } }}
                            >
                                <MenuItem onClick={handleLogout} sx={{ color: "error.main", gap: 1 }}>
                                    <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "error.main" }} /></ListItemIcon>
                                    {t('Login')}
                                </MenuItem>
                            </Menu>

                            {/* CART */}
                            <IconButton size="small" sx={{ p: { xs: 0.5, md: 1 } }} color="inherit" component={RouterLink} to="/cart">
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingBagOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>

                    {/* MOBILE DRAWER */}
                    <Drawer anchor="left" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 280, borderTopRightRadius: 16, borderBottomRightRadius: 16 } }}>
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box component="img" src={siteIcon} alt="KaShop logo" sx={{ width: 32, height: 32 }} />
                            <Typography fontWeight={700} fontSize="1.2rem">KASHOP</Typography>
                        </Box>
                        <List>
                            <ListItemButton component={RouterLink} to="/" onClick={() => setOpen(false)}><ListItemText primary={t('Home')} /></ListItemButton>
                            <ListItemButton component={RouterLink} to="/shop" onClick={() => setOpen(false)}><ListItemText primary={t('Products')} /></ListItemButton>
                            <ListItemButton component={RouterLink} to="/about" onClick={() => setOpen(false)}><ListItemText primary="About" /></ListItemButton>
                            <ListItemButton component={RouterLink} to="/" onClick={() => setOpen(false)}><ListItemText primary="Contact" /></ListItemButton>
                            {token && (
                                <>
                                    <Divider sx={{ my: 1 }} />
                                    <ListItemButton onClick={handleLogout} sx={{ color: "error.main" }}>
                                        <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "error.main" }} /></ListItemIcon>
                                        <ListItemText primary={t('Logout')} />
                                    </ListItemButton>
                                </>
                            )}
                        </List>
                    </Drawer>
                </Container>
            </AppBar>
        </Box>
    );
}