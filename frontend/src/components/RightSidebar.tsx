import { useEffect, useState } from "react";
import { Box, Avatar, Typography, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useChatStore } from "../store/useChat";
import RightSidebarSkeleton from "./skeletons/RightSideBarSkeleton";

const RightSidebar = () => {
  const { users, getUsers, isLoading } = useChatStore();
  const [isPlaying, setIsPlaying] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isLoading) {
    return <RightSidebarSkeleton />;
  }

  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: theme.palette.background.default,
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: theme.palette.text.primary, marginBottom: "16px" }}
      >
        Friends Activity
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {users.map((user) => (
          <Box
            key={user._id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "8px",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "8px",
              boxShadow: 1,
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
              {user.fullname.split(" ")[0][0]}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <PersonIcon sx={{ color: theme.palette.primary.main }} />
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {user.fullname}
                </Typography>
              </Box>
              {isPlaying && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <PlayArrowIcon sx={{ color: theme.palette.secondary.main }} />
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Blinding Lights - The Weeknd
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RightSidebar;
