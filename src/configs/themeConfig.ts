import { createTheme } from '@mui/material/styles';

const themeConfig = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#92DB25',
      dark: '#2F2F2F',
    },
    secondary: {
      main: '#B4E6FC',
    },

  },
  typography: {
    fontFamily: 'inherit',
  },
});

export default themeConfig;
