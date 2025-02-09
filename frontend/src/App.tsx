import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import useThemeStore from "./store/useTheme";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import SignInPage from "./pages/signin/SignInPage";
import AuthContextProvider from "./providers/auth.provider";
import ToggleThemeButton from "./components/TogglethemeButton";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuth";
import MainLayout from "./components/MainLayout";
import MainAlbum from "./pages/albums/mainalbum/MainAlbum";
import AdminPage from "./pages/Admin/AdminPage";
import ChatPage from "./pages/chat/ChatPage";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const { user, getCurrentUser, checkIsAdmin } = useAuthStore();
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(
      theme.palette.mode === "dark" ? "dark" : "light"
    );
    const getUser = async () => {
      await getCurrentUser();
    };
    getUser();
    checkIsAdmin();
  }, [theme, getCurrentUser, checkIsAdmin]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <CssBaseline />
        <IconButton sx={{zIndex : 1000}}>
          <ToggleThemeButton />
        </IconButton>
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to={"/"} /> : <SignUpPage />}
          ></Route>
          <Route
            path="/signin"
            element={user ? <Navigate to={"/"} /> : <SignInPage />}
          ></Route>
          <Route
            path="admin"
            element={
              user?.email === "amiramraja@gmail.com" ? (
                <AdminPage />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/albums/:id" element={<MainAlbum />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
