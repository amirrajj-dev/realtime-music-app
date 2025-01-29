import {create} from 'zustand';
import { Theme } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme/theme';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>(set => ({
  theme: darkTheme,
  toggleTheme: () =>
    set(state => ({
      theme: state.theme.palette.mode === 'light' ? darkTheme : lightTheme,
    })),
}));

export default useThemeStore;