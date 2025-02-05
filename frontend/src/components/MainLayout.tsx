import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import LeftSideBar from "./LeftSideBar";
import RightSidebar from "./RightSidebar";
import PlaybackControls from "./PlayBackControls";

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        pb: '120px', 
      }}
    >
      <Grid
        container
        spacing={2}
        style={{
          width: "100%",
          flex: 1,
          padding: isMobile ? "8px" : "16px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid item xs={12} lg={2.75}>
          <Box
            sx={{
              padding: isMobile ? "8px" : "12px",
              height: "100%",
              borderRadius: "4px",
            }}
          >
            <LeftSideBar />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6.5}>
          <Box
            sx={{
              height: "100%",
              padding: isMobile ? "8px" : "12px",
              borderRadius: "4px",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
        <Grid item xs={12} lg={2.75}>
          <Box
            sx={{
              padding: isMobile ? "8px" : "12px",
              height: "100%",
              borderRadius: "4px",
            }}
          >
            <RightSidebar />
          </Box>
        </Grid>
      </Grid>
      <PlaybackControls /> 
    </Box>
  );
};

export default MainLayout;