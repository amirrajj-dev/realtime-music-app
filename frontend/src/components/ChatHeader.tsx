import { Box, Typography, Avatar, useTheme } from "@mui/material";
import OnlineIcon from "@mui/icons-material/FiberManualRecord";
import { IUser } from "../interfaces/interface";

interface ChatHeaderProps {
  selectedUser: IUser;
  onlineUsers: Set<string>;
}

const ChatHeader = ({ selectedUser, onlineUsers }: ChatHeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        padding: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Avatar
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          {selectedUser?.fullname.charAt(0)}
        </Avatar>
        <Typography variant="h6" color={theme.palette.text.primary}>
          {selectedUser?.fullname}
        </Typography>
      </Box>
      {onlineUsers.has(String(selectedUser?._id)) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            position: "absolute",
            bottom: "0px",
            left: "55px",
          }}
        >
          <OnlineIcon sx={{ color: theme.palette.success.main, fontSize: "12px" }} />
          <Typography variant="caption" color={theme.palette.text.secondary}>
            Online
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatHeader;