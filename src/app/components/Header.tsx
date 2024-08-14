'use client';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#035036',
          height: '60px',
          p: 1,
          textAlign: 'center',
        }}>
        <Typography sx={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.875rem' : '1rem' }}>
          10만원 이상 주문 시 모든 주문 무료 배송 (Standard Shipping)
        </Typography>
      </Box>
      <Link href={'/'}>Home</Link>
      <Link href={'/login'}>Log in</Link>
      <Link href={'/register'}>Register</Link>
    </>
  );
};

export default Header;
