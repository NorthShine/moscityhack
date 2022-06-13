import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Commissioner, sans-serif;'
  },
  palette: {
    primary: {
      main: '#6f6af8',
      light: '#f8f8ff'
    },
    secondary: {
      main: '#ff0076',
      dark: '#ff7d7d'
    },
    error: {
      dark: '#ffe8e8',
      main: '#ffaaaa'
    },
    warning: {
      dark: '#fff1ec',
      main: '#ffcca1'
    },
    success: {
      dark: '#e9ffeb',
      main: '#bef39b'
    }
  }
});
