import { useEffect } from "react";
import { Box, Avatar, Typography, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useChatStore } from "../store/useChat";
import RightSidebarSkeleton from "./skeletons/RightSideBarSkeleton";
import { useAuthStore } from "../store/useAuth";

const RightSidebar = () => {
  const { users, getUsers, isLoading, onlineUsers, userActivities } = useChatStore();
  const { user } = useAuthStore();
  const theme = useTheme();

  console.log(userActivities);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    console.log("Updated Activities:", userActivities);
  }, [userActivities]);

  if (isLoading) {
    return <RightSidebarSkeleton />;
  }

  if (!user) {
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
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          Please log in to see your friends' activities.
        </Typography>
      </Box>
    );
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
        {users.map((user) => {
          const activity = userActivities.get(user._id) || "No activity";
          const isPlaying = activity && activity !== "paused the song";
          const isOnline = onlineUsers.has(user._id);
          const isPaused = activity === "paused the song";

          return (
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
                  {/* Display the online indicator */}
                  {isOnline && (
                    <FiberManualRecordIcon
                      sx={{ color: theme.palette.success.main, fontSize: "12px" }}
                    />
                  )}
                </Box>
                {isPaused ? (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <PauseIcon sx={{ color: theme.palette.warning.main }} />
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Paused the song
                    </Typography>
                  </Box>
                ) : isPlaying ? (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <PlayArrowIcon sx={{ color: theme.palette.secondary.main }} />
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {activity}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <PauseIcon sx={{ color: theme.palette.warning.main }} />
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Paused the song
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RightSidebar;