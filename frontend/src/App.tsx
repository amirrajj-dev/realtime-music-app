import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ToggleThemeButton from './components/TogglethemeButton';
import useThemeStore from './store/useTheme';

const App: React.FC = () => {
  const theme = useThemeStore(state => state.theme);
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme.palette.mode === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: 16 }}>
        <ToggleThemeButton />
        <h1 className='text-black bg-indigo-600 p-4 rounded-md dark:bg-yellow-600 dark:text-white'>Hello, World!</h1>
      </div>
    </ThemeProvider>
  );
};

export default App;