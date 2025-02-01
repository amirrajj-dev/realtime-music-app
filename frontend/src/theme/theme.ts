import { createTheme, Theme } from '@mui/material/styles';

const tailwindColors = {
  light: {
    primary: '#1e3a8a', // Indigo-900
    secondary: '#f59e0b', // Amber-500
    backgroundDefault: '#ffffff', // White
    backgroundPaper: '#f3f4f6', // Gray-100
    textPrimary: '#1f2937', // Gray-800
    textSecondary: '#4b5563', // Gray-600
    error: '#dc2626', // Red-600
    warning: '#f59e0b', // Amber-500
    info: '#2563eb', // Blue-600
    success: '#16a34a', // Green-600
  },
  dark: {
    primary: '#34d399', // Emerald-400
    secondary: '#818cf8', // Indigo-400
    backgroundDefault: '#1e293b', // Stone-800
    backgroundPaper: '#111827', // Zinc-900
    textPrimary: '#f9fafb', // White
    textSecondary: '#d1d5db', // Gray-300
    error: '#ef4444', // Red-500
    warning: '#fbbf24', // Amber-400
    info: '#60a5fa', // Blue-400
    success: '#34d399', // Emerald-400
  },
};

export const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: tailwindColors.light.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: tailwindColors.light.secondary,
      contrastText: '#000000',
    },
    background: {
      default: tailwindColors.light.backgroundDefault,
      paper: tailwindColors.light.backgroundPaper,
    },
    text: {
      primary: tailwindColors.light.textPrimary,
      secondary: tailwindColors.light.textSecondary,
    },
    error: {
      main: tailwindColors.light.error,
      contrastText: '#ffffff',
    },
    warning: {
      main: tailwindColors.light.warning,
      contrastText: '#000000',
    },
    info: {
      main: tailwindColors.light.info,
      contrastText: '#ffffff',
    },
    success: {
      main: tailwindColors.light.success,
      contrastText: '#ffffff',
    },
  },
});

export const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tailwindColors.dark.primary,
      contrastText: '#000000',
    },
    secondary: {
      main: tailwindColors.dark.secondary,
      contrastText: '#000000',
    },
    background: {
      default: tailwindColors.dark.backgroundDefault,
      paper: tailwindColors.dark.backgroundPaper,
    },
    text: {
      primary: tailwindColors.dark.textPrimary,
      secondary: tailwindColors.dark.textSecondary,
    },
    error: {
      main: tailwindColors.dark.error,
      contrastText: '#000000',
    },
    warning: {
      main: tailwindColors.dark.warning,
      contrastText: '#000000',
    },
    info: {
      main: tailwindColors.dark.info,
      contrastText: '#000000',
    },
    success: {
      main: tailwindColors.dark.success,
      contrastText: '#000000',
    },
  },
});