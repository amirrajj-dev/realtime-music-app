import { TextField, Button, Typography, Box } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useThemeStore from "../store/useTheme";

const SignIn = () => {
  const { theme } = useThemeStore();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "Background.default",
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
            alt=""
          />
        </Box>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "primary.main" }}
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
                <Email sx={{ marginRight: 1, color: "text.secondary" }} />
              ),
            }}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginY: 2,
              color: "white",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Sign In
          </Button>
          <Box sx={{display : 'flex' , alignItems : 'center' , gap : '3px'}}>
            Don't have an account?{" "}
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "primary.main" }}
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
