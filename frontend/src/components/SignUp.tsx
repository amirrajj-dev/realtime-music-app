import { TextField, Button, Typography, Box } from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useThemeStore from "../store/useTheme";

const SignUp = () => {
  const { theme } = useThemeStore();
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
            Sign Up
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
            Already Have an account?{" "}
            <Typography
              variant="body2"
              align="center"
              sx={{ color: "primary.main" }}
            >
              <Link to="/sigin" className="hover:underline">
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
