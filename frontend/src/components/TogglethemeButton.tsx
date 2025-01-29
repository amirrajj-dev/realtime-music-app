import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useThemeStore from '../store/useTheme';

const ToggleThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Tooltip title={theme.palette.mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={theme.palette.mode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      >
        {theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ToggleThemeButton;