import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useAuthStore } from "../store/useAuth";
import TopBarSkeleton from "./skeletons/TopBarSkeleton";
import { toast, ToastOptions } from "react-toastify";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, isAdmin, isLoading, logout } = useAuthStore();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const toastOptions: ToastOptions = {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      className: theme.palette.mode === "dark" ? "dark" : "light",
    };
    handleMenuClose();
    const res = await logout();
    if (res?.success) {
      toast.success("Logged out successfully", toastOptions);
    }
  };

  if (isLoading) {
    return <TopBarSkeleton />;
  }

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 1 }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "50%",
                marginRight: "8px",
              }}
            >
              <MusicNoteIcon
                sx={{ color: theme.palette.primary.contrastText }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              Music App
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "8px", sm: "16px" },
            }}
          >
            {!isMobile && isAdmin && (
              <Link to={'/admin'}>
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
            {user ? (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    {user.fullname.split(" ")[0][0]}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>{user.email}</MenuItem>
                  {isMobile && isAdmin && <MenuItem>Admin Dashboard</MenuItem>}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to={"/signin"}>
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: "16px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.primary,
            fontSize: {
              xs: "1.15rem",
              lg: "2rem",
            },
          }}
        >
          {user
            ? `Welcome to the Music App, ${user.fullname}!`
            : "Welcome to the Music App!"}
        </Typography>
      </Box>
    </Box>
  );
};

export default TopBar;
