'use client';

import { ReactNode } from 'react';

import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
  },
  palette: {
    primary: {
      main: '#035036',
      light: '#AFC6AA', // 원하는 색상 코드로 변경
    },
    secondary: {
      main: '#AFC6AA',
    },
  },
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
