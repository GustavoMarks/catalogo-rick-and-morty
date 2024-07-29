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
  mixins: {
    // @ts-ignore
    MuiDataGrid: {
      // Pinned columns sections
      pinnedBackground: '#340606',
      // Headers, and top & bottom fixed rows
      containerBackground: '#121212',
    },
  },
});

export default themeConfig;
