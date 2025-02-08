import React from 'react';
import { Box, Typography, Paper, Avatar, TextField, IconButton, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { IMessage, IUser } from '../../../interfaces/interface';

const ChatPlace = ({ messages, selectedUser } : {messages : IMessage[], selectedUser : IUser}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        borderRadius: '8px',
        boxShadow: 3,
        width: '87%'
      }}
    >
      {selectedUser ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
              {selectedUser.fullname.split(" ")[0][0]}
            </Avatar>
              <Typography>
                {selectedUser.fullname}
              </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '16px',
            }}
          >
            {messages.map(message => (
              <Paper key={message._id} sx={{ marginBottom: '8px', padding: '16px' }}>
                <Typography variant="body1">{message.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(String(message.createdAt)).toLocaleDateString()}
                </Typography>
              </Paper>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type a message"
              sx={{ marginRight: '16px' }}
            />
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
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

export default ChatPlace;