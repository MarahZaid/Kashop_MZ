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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import siteIcon from '../../assets/siteIcon.png';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import { useAuthStore } from '../../store/useAuthStore';
import useCart from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import useThemeStore from '../../store/useThemeStore'


export default function Navbar() {
    const mode = useThemeStore((state) => state.mode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const location = useLocation();
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

    const navLinkSx = (path) => ({
        color: location.pathname === path ? "primary.main" : "text.primary",
        fontWeight: location.pathname === path ? 700 : 400,
        position: "relative",
        textDecoration: "none",
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: -4,
            left: 0,
            width: location.pathname === path ? "100%" : "0%",
            height: "2px",
            background: "linear-gradient(90deg, #c026d3, #a855f7)",
            borderRadius: 4,
            transition: "width 0.25s ease",
        },
        "&:hover::after": { width: "100%" },
        "&:hover": { color: "primary.main" },
    });


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    py: 2,
                    bgcolor: "background.default",
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                }}
            >
                <Container sx={{ width: '100%', maxWidth: 1200 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>

                        {/* LEFT: Hamburger (mobile) + Logo */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                onClick={() => setOpen(true)}
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
                                <Box component="img" src={siteIcon} alt="KaShop logo" sx={{ width: { xs: 22, md: 28 }, height: { xs: 22, md: 28 } }} />
                                <Typography
                                    component={RouterLink}
                                    to="/"
                                    variant="h5"
                                    sx={{
                                        position: 'relative',
                                        textDecoration: 'none',
                                        color: 'text.primary',
                                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                                        fontWeight: 700,
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 2,
                                            width: '99%',
                                            height: '2px',
                                            backgroundColor: 'primary.main',
                                            borderRadius: 4
                                        }
                                    }}
                                >
                                    KASHOP
                                </Typography>
                            </Box>
                        </Box>

                        {/* CENTER: Nav Links (desktop only) */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                            <Link component={RouterLink} to={'/'} sx={navLinkSx('/')} underline='none'>{t('Home')}</Link>
                            <Link component={RouterLink} to={'/shop'} sx={navLinkSx('/shop')} underline='none'>{t('Shop')}</Link>
                            <Link component={RouterLink} to={'/about'} sx={navLinkSx('/about')} underline='none'>{t('About')}</Link>
                            <Link component={RouterLink} to={'/contact'} sx={navLinkSx('/contact')} underline='none'>{t('Contact')}</Link>
                        </Box>

                        {/* RIGHT: Icons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>

                            {/* Language - hide on mobile to save space */}
                            <IconButton
                                onClick={changeLanguage}
                                sx={{ color: "text.primary", p: { xs: 0.5, md: 1 }, display: { xs: 'none', md: 'flex' } }}
                            >
                                <Badge
                                    badgeContent={i18n.language === "ar" ? "EN" : "AR"}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            bgcolor: "primary.main",
                                            color: "white",
                                            minWidth: 16,
                                            height: 16,
                                        }
                                    }}
                                >
                                    <LanguageIcon />
                                </Badge>
                            </IconButton>

                            {/* Dark mode - hide on mobile */}
                            <IconButton
                                onClick={toggleTheme}
                                sx={{ color: "text.primary", p: { xs: 0.5, md: 1 }, display: { xs: 'none', md: 'flex' } }}
                            >
                                {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                            </IconButton>

                            {/* User */}
                            <IconButton
                                size="small"
                                sx={{ p: { xs: 0.5, md: 1 }, color: "text.primary", display: { xs: 'none', md: 'flex' } }} // ← أضف display
                                onClick={handleUserClick}
                            >
                                <PersonOutlineIcon />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        minWidth: 160,
                                        borderRadius: 3,
                                        bgcolor: "background.paper",
                                        color: "text.primary"
                                    }
                                }}
                            >
                                {/* PROFILE */}
                                <MenuItem
                                    component={RouterLink}
                                    to="/profile"
                                    onClick={() => setAnchorEl(null)}
                                    sx={{ gap: 1 }}
                                >
                                    <ListItemIcon>
                                        <AccountCircleOutlinedIcon fontSize="small" sx={{ color: "#c026d3" }} />
                                    </ListItemIcon>
                                    {t('Profile')}
                                </MenuItem>

                                <Divider />

                                {/* LOGOUT */}
                                <MenuItem onClick={handleLogout} sx={{ color: "error.main", gap: 1 }}>
                                    <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "error.main" }} /></ListItemIcon>
                                    {t('Logout')}
                                </MenuItem>
                            </Menu>



                            {/* Cart */}
                            <IconButton
                                size="small"
                                sx={{ p: { xs: 0.5, md: 0.8 }, color: "text.primary" }}
                                component={RouterLink}
                                to="/cart"
                            >
                                <Badge
                                    badgeContent={cartCount}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            bgcolor: "primary.main",
                                            color: "white",
                                        }
                                    }}
                                >
                                    <ShoppingBagOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>

                    {/* MOBILE DRAWER */}
                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={() => setOpen(false)}
                        PaperProps={{
                            sx: {
                                width: 280,
                                borderTopRightRadius: 16,
                                borderBottomRightRadius: 16,
                                bgcolor: "background.paper",
                                color: "text.primary"
                            }
                        }}
                    >
                        <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box component="img" src={siteIcon} alt="KaShop logo" sx={{ width: 32, height: 32 }} />
                            <Typography fontWeight={700} fontSize="1.2rem">KASHOP</Typography>
                        </Box>
                        <List>
                            <ListItemButton component={RouterLink} to="/" onClick={() => setOpen(false)} selected={location.pathname === '/'}><ListItemText primary={t('Home')} /></ListItemButton>
                            <ListItemButton component={RouterLink} to="/shop" onClick={() => setOpen(false)} selected={location.pathname === '/shop'}><ListItemText primary={t('Products')} /></ListItemButton>
                            <ListItemButton component={RouterLink} to="/about" onClick={() => setOpen(false)} selected={location.pathname === '/about'}><ListItemText primary={t('About')} /></ListItemButton>
                            <ListItemButton component={RouterLink} to="/contact" onClick={() => setOpen(false)} selected={location.pathname === '/contact'}><ListItemText primary={t('Contact')} /></ListItemButton>

                            <Divider sx={{ my: 1 }} />

                            {/* THEME TOGGLE */}
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemIcon>
                                    {mode === 'dark'
                                        ? <LightModeOutlinedIcon fontSize="small" sx={{ color: "#c026d3" }} />
                                        : <DarkModeOutlinedIcon fontSize="small" sx={{ color: "#c026d3" }} />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={mode === 'dark' ? t('Light Mode') : t('Dark Mode')} />
                            </ListItemButton>

                            {/* LANGUAGE TOGGLE */}
                            <ListItemButton onClick={changeLanguage}>
                                <ListItemIcon>
                                    <LanguageIcon fontSize="small" sx={{ color: "#c026d3" }} />
                                </ListItemIcon>
                                <ListItemText primary={i18n.language === "ar" ? "English" : "العربية"} />
                            </ListItemButton>
                            <Divider sx={{ my: 1 }} />

                            {token ? (
                                <>
                                    {/* PROFILE */}
                                    <ListItemButton component={RouterLink} to="/profile" onClick={() => setOpen(false)}>
                                        <ListItemIcon>
                                            <AccountCircleOutlinedIcon fontSize="small" sx={{ color: "#c026d3" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={t('Profile')} />
                                    </ListItemButton>

                                    {/* LOGOUT */}
                                    <ListItemButton onClick={handleLogout} sx={{ color: "error.main" }}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={t('Logout')} />
                                    </ListItemButton>
                                </>
                            ) : (
                                /* LOGIN */
                                <ListItemButton
                                    component={RouterLink}
                                    to="/login"
                                    onClick={() => setOpen(false)}
                                >
                                    <ListItemIcon>
                                        <PersonOutlineIcon fontSize="small" sx={{ color: "#c026d3" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t('Login')} />
                                </ListItemButton>
                            )}
                        </List>
                    </Drawer>
                </Container>
            </AppBar>
        </Box>
    );
}