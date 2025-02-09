import { useEffect, useState, useCallback, memo } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import OnlineIcon from "@mui/icons-material/FiberManualRecord"; // Add this import for the online icon
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
  const { sendMessage, fetchMessages, onlineUsers } = useChatStore();
  const [messageContent, setMessageContent] = useState<string>("");

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleSendMessage = useCallback(() => {
    if (messageContent.trim().length) {
      sendMessage(user!.id as string, selectedUser._id, messageContent);
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
              position : 'relative',
              padding: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: "flex", gap: '8px', alignItems: 'center' }}>
              <Avatar
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                {selectedUser.fullname.charAt(0)}
              </Avatar>
              <Typography variant="h6" color={theme.palette.text.primary}>
                {selectedUser.fullname}
              </Typography>
            </Box>
            {onlineUsers.has(String(selectedUser._id)) && (
              <Box sx={{ display: "flex", alignItems: 'center', gap: '4px' , position : 'absolute' , bottom : '0px' , left : '55px' }}>
                <OnlineIcon sx={{ color: theme.palette.success.main, fontSize: '12px' }} /> {/* Online icon */}
                <Typography variant="caption" color={theme.palette.text.secondary}>
                  Online
                </Typography>
              </Box>
            )}
          </Box>

          {/* Messages Section */}
          <Box
            className="scrollbar-thin"
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
                    {isCurrentUser
                      ? user?.fullname.charAt(0)
                      : selectedUser?.fullname.charAt(0)}
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
                      sx={{
                        display: "block",
                        marginTop: 0.5,
                        textAlign: "right",
                      }}
                    >
                      {new Date(String(message.createdAt)).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
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
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: theme.palette.divider },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
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
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6" color="textSecondary" align="center">
            Please select a user to start chatting.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default memo(ChatPlace);