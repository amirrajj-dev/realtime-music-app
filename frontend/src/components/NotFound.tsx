import { Box, Button, Typography, useTheme } from "@mui/material";
import { MusicNote, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NotFound() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      className="flex flex-col items-center justify-center h-screen text-center p-4"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <MusicNote
        className="animate-bounce"
        sx={{ color: isDark ? theme.palette.primary.main : theme.palette.secondary.main, mb: 2 , fontSize : '80px' }}
      />

      <Typography variant="h2" fontWeight="bold" sx={{fontSize : {
        xs: "2rem", sm: "2.5rem", md: "3rem"
      }}}>
        404 - Not Found
      </Typography>

      <Typography variant="h6" className="mt-2 text-gray-500" sx={{
        fontSize : {
          xs: "1rem", sm: "1.25rem", md: "1.5rem"
        }
      }}>
        Oops! Looks like you're out of tune. This page doesn't exist.
      </Typography>

      <Box className="mt-6">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Home />}
          component={Link}
          to="/"
          sx={{ px: 3, py: 1.5, fontWeight: "bold", borderRadius: 2 }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}