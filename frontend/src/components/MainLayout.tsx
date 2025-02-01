import { Grid, Box, useTheme } from "@mui/material";
import {Outlet} from 'react-router-dom'
const MainLayout = () => {
    const theme = useTheme()
  return (
    <Grid
      container
      spacing={2}
      style={{
        width: "100%",
        flex: 1,
        padding: "16px",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "16px",
            height: "100%",
            borderRadius: "4px",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.main,
            height: "100%",
            padding: "16px",
            borderRadius: "4px",
          }}
        >
            <Outlet />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            padding: "16px",
            height: "100%",
            borderRadius: "4px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
