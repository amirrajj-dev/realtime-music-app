import { useEffect, useCallback, memo } from "react";
import { Box} from "@mui/material";
import { useAuthStore } from "../../../store/useAuth";
import { useChatStore } from "../../../store/useChat";
import ChatHeader from "../../../components/ChatHeader";
import MessageSection from "../../../components/MessageSection";
import MessageInputField from "../../../components/MessageInputField";
import { IMessage, IUser } from "../../../interfaces/interface";

interface ChatPlaceProps {
  messages: IMessage[];
  selectedUser: IUser;
  isMobile: boolean;
}

const ChatPlace = ({ messages, selectedUser }: ChatPlaceProps) => {
  const { user, getCurrentUser } = useAuthStore();
  const { sendMessage, fetchMessages, onlineUsers, isLoading } = useChatStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleSendMessage = useCallback(
    (message: string) => {
      sendMessage(user!.id as string, selectedUser._id, message);
      fetchMessages(String(selectedUser._id));
    },
    [sendMessage, user, selectedUser, fetchMessages]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" , width : '87%' }}>
      <ChatHeader selectedUser={selectedUser} onlineUsers={onlineUsers} />
      <MessageSection messages={messages} user={user} selectedUser={selectedUser} isLoading={isLoading} />
      <MessageInputField onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default memo(ChatPlace);