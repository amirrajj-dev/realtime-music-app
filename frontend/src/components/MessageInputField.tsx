import { useState } from "react";
import { Box, TextField, IconButton, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputFieldProps {
  onSendMessage: (message: string) => void;
}

const MessageInputField = ({ onSendMessage }: MessageInputFieldProps) => {
  const theme = useTheme();
  const [messageContent, setMessageContent] = useState("");

  const handleSend = () => {
    if (messageContent.trim().length) {
      onSendMessage(messageContent);
      setMessageContent("");
    }
  };

  return (
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
            "&:hover fieldset": { borderColor: theme.palette.primary.main },
            "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
          },
        }}
      />
      <IconButton color="primary" onClick={handleSend} sx={{ marginLeft: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInputField;