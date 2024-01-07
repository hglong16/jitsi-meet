import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(183, 34, 50, 1)',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: ({ ownerState }) => {
          console.log('### ownerState', ownerState);
          return {
            ...(ownerState.color === 'primary' && {
              backgroundColor: 'rgba(183, 34, 50, 1)!important',
              color: '#fff',
            }),
          }
        },
      }
    }
  }
});

export default theme;