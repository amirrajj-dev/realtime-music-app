import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import useThemeStore from "./store/useTheme";
import { Route, Routes , Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignInPage from "./pages/signin/SignInPage";
import AuthContextProvider from "./providers/auth.provider";
import ToggleThemeButton from "./components/TogglethemeButton";
import {ToastContainer} from 'react-toastify'
import { useAuthStore } from "./store/useAuth";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const {user , getCurrentUser} = useAuthStore()
  console.log(user);
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(
      theme.palette.mode === "dark" ? "dark" : "light"
    );
    const getUser = async ()=>{
      await getCurrentUser()
    }
    getUser()
  }, [theme , getCurrentUser]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <ToggleThemeButton/>
        <Routes>
          <Route path="/signup" element={user ? <Navigate to={'/'}/> : <SignUpPage />}></Route>
          <Route path="/signin" element={user ? <Navigate to={'/'} /> : <SignInPage/>}></Route>
          <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage />}></Route>
          </Route>
        </Routes>
        <ToastContainer/>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
