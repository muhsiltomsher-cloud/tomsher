import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#475569',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontFamily: 'Poppins, system-ui, sans-serif',
    },
    h2: {
      fontFamily: 'Poppins, system-ui, sans-serif',
    },
    h3: {
      fontFamily: 'Poppins, system-ui, sans-serif',
    },
    h4: {
      fontFamily: 'Poppins, system-ui, sans-serif',
    },
    h5: {
      fontFamily: 'Poppins, system-ui, sans-serif',
    },
    h6: {
      fontFamily: 'Poppins, system-ui, sans-serif',
    },
  },
})