import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useStatsStore } from "../../store/useStats";
import { useEffect } from "react";
import { useMusicStore } from "../../store/useMusic";
import { useAuthStore } from "../../store/useAuth";

const AdminPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {albumsCount , artistsCount , songsCount , usersCount , getStats} = useStatsStore()
  const {albums , getAlbums , songs , getSongs} = useMusicStore()
  const {user} = useAuthStore()
  useEffect(()=>{
    getStats()
    getAlbums()
    getSongs()
  } , [getStats , getAlbums , getSongs])
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        pb: "120px",
      }}
    >
      <Grid
        container
        style={{
          width: "100%",
          flex: 1,
          padding: isMobile ? "8px" : "40px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        
      </Grid>
    </Box>
  );
};

export default AdminPage;
