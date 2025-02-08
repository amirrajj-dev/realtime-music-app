import { useEffect, useState, useCallback, memo } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  IconButton,
  useTheme,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IMessage, IUser } from "../../../interfaces/interface";
import { useAuthStore } from "../../../store/useAuth";
import { useChatStore } from "../../../store/useChat";

interface ChatPlaceProps {
  messages: IMessage[];
  selectedUser: IUser;
  isMobile: boolean;
}

const ChatPlace = ({ messages, selectedUser, isMobile }: ChatPlaceProps) => {
  const theme = useTheme();
  const { user, getCurrentUser } = useAuthStore();
  const { sendMessage, fetchMessages } = useChatStore();
  const [messageContent, setMessageContent] = useState<string>("");

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleSendMessage = useCallback(() => {
    if (messageContent.trim().length) {
      sendMessage(user!.id, selectedUser._id, messageContent);
      setMessageContent("");
      fetchMessages(String(selectedUser._id));
    }
  }, [messageContent, sendMessage, user, selectedUser, fetchMessages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        boxShadow: 3,
        width: isMobile ? "100%" : "87%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Chat Header */}
      {selectedUser ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Avatar sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
              {selectedUser.fullname.charAt(0)}
            </Avatar>
            <Typography variant="h6" color={theme.palette.text.primary}>
              {selectedUser.fullname}
            </Typography>
          </Box>

          {/* Messages Section */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              padding: 2,
              backgroundColor: theme.palette.background.default,
            }}
          >
            {messages.map((message) => {
              const isCurrentUser = message.senderId === user?.id;
              return (
                <Box
                  key={message._id}
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

                  {/* Message Bubble */}
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
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Paper>
                </Box>
              );
            })}
          </Box>

          {/* Message Input Field */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type a message..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.palette.divider },
                  '&:hover fieldset': { borderColor: theme.palette.primary.main },
                  '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              sx={{
                marginLeft: 1,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': { backgroundColor: theme.palette.primary.dark },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Typography variant="h6" color="textSecondary" align="center">
            Please select a user to start chatting.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default memo(ChatPlace);