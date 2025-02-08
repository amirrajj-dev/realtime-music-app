import { useEffect } from 'react';
import { useChatStore } from '../../store/useChat';
import { useAuthStore } from '../../store/useAuth';
import Sidebar from './components/SideBar';
import ChatPlace from './components/ChatPlace';
import { Box } from '@mui/material';
import { IUser } from '../../interfaces/interface';

const ChatPage = () => {
  const { user } = useAuthStore();
  const { getUsers, users, messages, selectedUser, fetchMessages , setSelectedUser } = useChatStore();

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
    <Box sx={{ display: 'flex' , height : '89vh' }}>
      <Sidebar users={users} selectUser={(user)=>setSelectedUser(user)} />
      <ChatPlace messages={messages} selectedUser={selectedUser as IUser} />
    </Box>
  );
};

export default ChatPage;