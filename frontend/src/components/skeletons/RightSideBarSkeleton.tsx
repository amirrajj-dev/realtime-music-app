import { Box, Skeleton, useTheme } from "@mui/material";

const RightSidebarSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: theme.palette.background.default,
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Skeleton variant="text" width="60%" height={40} sx={{ marginBottom: "16px" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "8px",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "8px",
              boxShadow: 1,
            }}
          >
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RightSidebarSkeleton;