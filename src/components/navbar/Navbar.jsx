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

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ py: 2 }}>
                <Container sx={{ width: '100%', maxWidth: 1200}}>
                    <Toolbar sx={{  justifyContent: 'space-between' }}>
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
                                sx={{ width: 28, height: 28 }}
                            />

                             <Typography
                            component={RouterLink}
                            to="/"
                            variant="h5"
                            sx={{
                                position: 'relative',
                                textDecoration: 'none',
                                color: 'black',
                                fontWeight: 700,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 2,
                                    width: '99%',
                                    height: '2px',
                                    backgroundColor: '#fb9b2d', // أصفر
                                    borderRadius: 4,
                                }
                            }}
                        >
                            KASHOP
                        </Typography>
                        </Box>
                       
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                            <Link component={RouterLink} to={'/'} color="inherit" underline='none'>Home</Link>
                            <Link component={RouterLink} to={'/cart'} color="inherit" underline='none'>Shop</Link>
                            <Link component={RouterLink} to={'/login'} color="inherit" underline='none'>Categories</Link>
                            <Link component={RouterLink} to={'/register'} color="inherit" underline='none'>About</Link>
                            <Link component={RouterLink} to={'/contact'} color="inherit" underline='none'>Contact</Link>
                        </Box>

                        <Box sx={{  display: { xs: 'none', md: 'flex'}, gap: 1 }}>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                            <IconButton>
                                <DarkModeOutlinedIcon />
                            </IconButton>
                            <IconButton component={RouterLink} to="/login">
                                <PersonOutlineIcon />
                            </IconButton>
                            <IconButton component={RouterLink} to="/cart">
                                <Badge badgeContent={3} color="secondary">
                                    <ShoppingBagOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ ml: 2, display: { xs: 'flex', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}