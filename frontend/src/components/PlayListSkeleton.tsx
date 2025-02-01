import { Box, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PlaylistSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
      }}
      className="space-y-4"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {Array.from(new Array(5)).map((_, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Skeleton variant="rectangular" sx={{width : '80px' , height : '50px' , borderRadius : '4px'}} />
            <Box sx={{ width: "100%" , display : 'flex' , flexDirection : 'column' , gap: '6px' }}>
              <Skeleton variant="rectangular" width="95%" height={20} sx={{borderRadius : '4px'}} />
              <Skeleton variant="rectangular" width="55%" height={20} sx={{borderRadius : '4px'}} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PlaylistSkeleton;