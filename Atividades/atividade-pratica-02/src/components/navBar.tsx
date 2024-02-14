"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { useRouter } from 'next/navigation'



function NavBar() {
  
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
      <AppBar position="static">
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
             Doações
            </Typography>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                key={"tiposSanguineos"}
                onClick={() => router.push('/tiposSanguineos')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Tipos Sanguíneos
              </Button>
              <Button
                key={"Estados"}
                onClick={() => router.push('/estados')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Estados
              </Button>
              <Button
                key={"cidades"}
                onClick={() => router.push('/cidades')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cidades
              </Button>
              <Button
                key={"Pessoas"}
                onClick={() => router.push('/pessoas')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Pessoas
              </Button>
              <Button
                key={"LocaisColeta"}
                onClick={() => router.push('/locaisColeta')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Locais de coleta
              </Button>
              

            </Box>

            <Box sx={{ flexGrow: 0 }}>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default NavBar;