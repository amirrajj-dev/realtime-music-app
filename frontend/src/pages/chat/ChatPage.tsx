import { useEffect } from 'react';
import { useChatStore } from '../../store/useChat';
import { useAuthStore } from '../../store/useAuth';
import Sidebar from './components/SideBar';
import ChatPlace from './components/ChatPlace';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import { IUser } from '../../interfaces/interface';

const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuthStore();
  const { getUsers, users, messages, selectedUser, fetchMessages, setSelectedUser, isLoading } = useChatStore();

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [getUsers, user]);

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
        overflow: 'hidden',
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