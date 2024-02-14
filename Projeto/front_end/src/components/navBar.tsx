"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { red, pink } from '@mui/material/colors';


function NavBar() {
  const theme = createTheme({
    palette: {
      primary: red,
      secondary: pink,
    },
  });


  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const router = useRouter()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: "primary" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={() => router.push('/')}
            >
              Run+
            </Typography>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                key={"equipametos"}
                onClick={() => router.push('/equipamentos')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Equipamentos
              </Button>
              <Button
                key={"Locais"}
                onClick={() => router.push('/locais')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Locais
              </Button>

            </Box>

            <Box sx={{ flexGrow: 0 }}>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>

  );
}
export default NavBar;