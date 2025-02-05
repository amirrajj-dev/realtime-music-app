import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

const AdminPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
