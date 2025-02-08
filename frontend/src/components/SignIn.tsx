import { TextField, Button, Typography, Box } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useThemeStore from "../store/useTheme";
import { useAuthStore } from "../store/useAuth";
import { useState } from "react";
import {toast , ToastOptions} from 'react-toastify'

const SignIn = () => {
  const { theme } = useThemeStore();
  const [formdata, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email : '',
    password : ''
  });
  const { signin , isLoading } = useAuthStore();
  const toastOptions = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: theme.palette.mode === 'dark' ? 'dark' : 'light',
  };
  const handleSignIn = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!emailRegex.test(formdata.email.trim())){
      toast.error('invalid email format' , toastOptions as ToastOptions)
      return;
    }
    if (formdata.password.trim().length < 6){
      toast.error('password must be at least 6 characters long' , toastOptions as ToastOptions)
      return;
    }
    const res = await signin(formdata)
    if (res!.success){
      toast.success('welcome back :)' , toastOptions as ToastOptions)
    }else{
      toast.error(res!.error || 'sth goes wrong siging you in :(' , toastOptions as ToastOptions)
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={`${
              theme.palette.mode === "dark"
                ? "public/app-logo/dark-logo.svg"
                : "public/app-logo/light-logo.svg"
            }`}
            alt="App Logo"
          />
        </Box>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: theme.palette.primary.main }}
          gutterBottom
        >
          Welcome Back
        </Typography>
        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Email
                  sx={{ marginRight: 1, color: theme.palette.text.secondary }}
                />
              ),
            }}
             value={formdata.email}
            onChange={(e)=>setFormData({...formdata , email : e.target.value})}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Lock
                  sx={{ marginRight: 1, color: theme.palette.text.secondary }}
                />
              ),
            }}
            value={formdata.password}
            onChange={(e)=>setFormData({...formdata , password : e.target.value})}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginY: 2,
              color: "white",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={e=>handleSignIn(e)}
          >
            {isLoading ? 'Signing In ...' : 'Sign In'}
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
            Don't have an account?{" "}
            <Typography
              variant="body2"
              align="center"
              sx={{ color: theme.palette.primary.main }}
            >
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
