import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import useThemeStore from './store/useTheme';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignUpPage from './pages/signup/SignUpPage';
import SignInPage from './pages/signin/SignInPage';

const App: React.FC = () => {
  const theme = useThemeStore(state => state.theme);
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme.palette.mode === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path='/signin' element={<SignInPage/>}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;