import { TextField, Button, Typography, Box } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useThemeStore from "../store/useTheme";
import { useState } from "react";
import {toast, ToastOptions} from 'react-toastify'
import { useAuthStore } from "../store/useAuth";
import { User } from "../interfaces/interface";

const SignUp = () => {
  const { theme } = useThemeStore();
  const {signup , isLoading , error} = useAuthStore()
  const navigate = useNavigate()
  const [formdata , setFormdata] = useState<User>({
    fullname: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const toastOptions = {
      position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className : theme.palette.mode === 'dark' ? 'dark' : 'light',
    }
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    e.preventDefault()
    if (!formdata.fullname.trim() || !formdata.email.trim() || !formdata.password.trim()) {
      toast.error('Please fill in all fields' , toastOptions as ToastOptions)
      return
    }
    if (!emailRegex.test(formdata.email)) {
      toast.error('Invalid email address' , toastOptions as ToastOptions)
      return
    }
    if (formdata.password.length < 6) {
      toast.error('Password must be at least 6 characters long' , toastOptions as ToastOptions)
      return
    }
    const res = await signup(formdata)
    if (res.success){
      toast.success('Signed up successfuly !' , toastOptions as ToastOptions)
      setTimeout(() => {
        navigate('/' , {
          replace: true,
        })
      }, 3000);
    }else{
      toast.error(error ? error : 'sth goes wrong signing you up :(', toastOptions as ToastOptions)
    }
  }
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          backgroundColor: "background.paper",
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
            className="fill-amber-400"
            alt="App Logo"
          />
        </Box>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "primary.main" }}
          gutterBottom
        >
          Create Account
        </Typography>
        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Person sx={{ marginRight: 1, color: "text.secondary" }} />
              ),
            }}
            value={formdata.fullname}
            onChange={(e) => setFormdata({...formdata, fullname: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Email sx={{ marginRight: 1, color: "text.secondary" }} />
              ),
            }}
            value={formdata.email}
            onChange={(e) => setFormdata({...formdata, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Lock sx={{ marginRight: 1, color: "text.secondary" }} />
              ),
            }}
            value={formdata.password}
            onChange={(e) => setFormdata({...formdata, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="disabled:cursor-not-allowed"
            sx={{
              marginY: 2,
              color: "white",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            disabled={isLoading}
            onClick={(e)=>handleSubmit(e)}
          >
            {isLoading ? 'Signing Up ...' : 'Sign Up'}
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
            Already Have an account?{" "}
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "primary.main" }}
            >
              <Link to="/signin" className="hover:underline">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;