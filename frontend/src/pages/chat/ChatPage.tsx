import { useEffect } from 'react';
import { useChatStore } from '../../store/useChat';
import Sidebar from './components/SideBar';
import ChatPlace from './components/ChatPlace';
import {Paper, useMediaQuery, useTheme } from '@mui/material';
import { IUser } from '../../interfaces/interface';

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {users, messages, selectedUser, fetchMessages, setSelectedUser, isLoading } = useChatStore();
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(String(selectedUser._id));
    }
  }, [fetchMessages, selectedUser]);

  return (
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: '89vh',
        borderRadius: '16px',
        overflow: isMobile ? 'auto' : 'hidden',
      }}
    >
      <Sidebar
        users={users}
        selectUser={(user) => setSelectedUser(user)}
        loading={isLoading}
        isMobile={isMobile}
      />
      <ChatPlace
        messages={messages}
        selectedUser={selectedUser as IUser}
        isMobile={isMobile}
      />
    </Paper>
  );
};

export default ChatPage;