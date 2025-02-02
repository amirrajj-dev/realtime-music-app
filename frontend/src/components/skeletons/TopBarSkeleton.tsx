import { Box, AppBar, Toolbar, Skeleton, useTheme } from "@mui/material";

const TopBarSkeleton = () => {
  const theme = useTheme();

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
              <Skeleton variant="circular" width={24} height={24} />
            </Box>
            <Skeleton variant="text" width={100} height={40} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Skeleton variant="rectangular" width={150} height={36} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: "16px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Skeleton variant="text" width={300} height={40} />
      </Box>
    </Box>
  );
};

export default TopBarSkeleton;