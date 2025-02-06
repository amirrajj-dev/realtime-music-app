import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";
import TopBarSkeleton from "./skeletons/TopBarSkeleton";

const AdminTopBar = () => {
  const theme = useTheme();
  const { user, logout , isLoading } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
  };

  if (isLoading){
    return (
      <TopBarSkeleton/>
    )
  }

  return (
    <AppBar position="static" sx={{ background: "transparent" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
            component={Link} 
            to="/" 
            sx={{
              bgcolor: theme.palette.primary.main, 
              p: 1.5,
              borderRadius: "50%",
              transition: "transform 0.3s",
              '&:hover': {
                transform: "scale(1.1)",
              }
            }}
          >
            <MusicNoteIcon sx={{ color: theme.palette.secondary.contrastText }} />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary , fontSize : {
                xs: "1rem", sm: "1.25rem", md: "1.5rem"  
          } }}>
            Music App
          </Typography>
        </Box>
         
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {user ? (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {user.fullname.split(" ")[0][0]}
                  </Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem disabled>{user.email}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/signin">
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.primary,
                    '&:hover': {
                      bgcolor: theme.palette.secondary.main,
                      borderColor: theme.palette.secondary.main,
                    },
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
  );
};

export default AdminTopBar;