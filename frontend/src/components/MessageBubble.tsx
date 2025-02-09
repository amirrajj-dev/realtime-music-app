import { Box, Paper, Avatar, Typography, useTheme } from "@mui/material";
import { IMessage , IUser } from "../interfaces/interface";

interface MessageBubbleProps {
  message: IMessage;
  user: IUser;
  selectedUser: IUser;
  isCurrentUser: boolean;
}

const MessageBubble = ({ message, user, selectedUser, isCurrentUser }: MessageBubbleProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isCurrentUser ? "row-reverse" : "row",
        alignItems: "center",
        marginBottom: 1.5,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: isCurrentUser
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
          color: isCurrentUser
            ? theme.palette.primary.contrastText
            : theme.palette.secondary.contrastText,
          margin: isCurrentUser ? "0 0 0 8px" : "0 8px 0 0",
        }}
      >
        {isCurrentUser ? user?.fullname.charAt(0) : selectedUser?.fullname.charAt(0)}
      </Avatar>

      <Paper
        sx={{
          padding: 2,
          maxWidth: "60%",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="body1">{message.message}</Typography>
        <Typography
          variant="caption"
          color={theme.palette.text.secondary}
          sx={{ display: "block", marginTop: 0.5, textAlign: "right" }}
        >
          {new Date(String(message.createdAt)).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageBubble;