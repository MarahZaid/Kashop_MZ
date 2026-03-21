import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Link,
    Badge
} from '@mui/material';
import Container from '@mui/material/Container';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import siteIcon from '../../assets/siteIcon.png';

import { Link as RouterLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    py: 2,
                    backgroundColor: "rgba(255,255,255)"
                }}
            >
                <Container sx={{ width: '100%', maxWidth: 1200 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
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

                            <Box
                                component={RouterLink}
                                to="/"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    textDecoration: 'none',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={siteIcon}
                                    alt="KaShop logo"
                                    sx={{
                                        width: { xs: 22, md: 28 },
                                        height: { xs: 22, md: 28 },
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
                                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                                        fontWeight: 700,
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            bottom: 2,
                                            width: '99%',
                                            height: '2px',
                                            backgroundColor: '#fb9b2d',
                                            borderRadius: 4,
                                        }
                                    }}
                                >
                                    KASHOP
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                            <Link component={RouterLink} to={'/'} color="inherit" underline='none'>Home</Link>
                            <Link component={RouterLink} to={'/shop'} color="inherit" underline='none'>Shop</Link>
                            <Link component={RouterLink} to={'/categories'} color="inherit" underline='none'>Categories</Link>
                            <Link component={RouterLink} to={'/about'} color="inherit" underline='none'>About</Link>
                            <Link component={RouterLink} to={'/'} color="inherit" underline='none'>Contact</Link>
                        </Box>



                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size="small" sx={{

                                p: { xs: 0.5, md: 1 }
                            }}>
                                <SearchIcon />
                            </IconButton>
                            <IconButton size="small" sx={{
                                p: { xs: 0.1, md: 1 }
                            }}>
                                <DarkModeOutlinedIcon />
                            </IconButton>
                            <IconButton size="small" sx={{
                                p: { xs: 0.1, md: 1 }
                            }} component={RouterLink} to="/login">
                                <PersonOutlineIcon />
                            </IconButton>
                            <IconButton size="small" sx={{
                                p: { xs: 0.1, md: 1 }
                            }} component={RouterLink} to="/cart">
                                <Badge badgeContent={3} color="secondary">
                                    <ShoppingBagOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>

                    </Toolbar>

                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={() => setOpen(false)}
                        PaperProps={{
                            sx: {
                                width: 280,
                                borderTopRightRadius: 16,
                                borderBottomRightRadius: 16,
                            },
                        }}
                    >
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                component="img"
                                src={siteIcon}
                                alt="KaShop logo"
                                sx={{ width: 32, height: 32 }}
                            />
                            <Typography fontWeight={700} fontSize="1.2rem">
                                KASHOP
                            </Typography>
                        </Box>




                        <Box sx={{ width: 250 }}>
                            <List>
                                <ListItemButton component={RouterLink} to="/" onClick={() => setOpen(false)}>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/shop" onClick={() => setOpen(false)}>
                                    <ListItemText primary="Shop" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/categories" onClick={() => setOpen(false)}>
                                    <ListItemText primary="Categories" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/about">
                                    <ListItemText primary="About" />
                                </ListItemButton>
                                <ListItemButton component={RouterLink} to="/">
                                    <ListItemText primary="Contact" />
                                </ListItemButton>
                            </List>
                        </Box>
                    </Drawer>
                </Container>
            </AppBar>
        </Box>
    );
}