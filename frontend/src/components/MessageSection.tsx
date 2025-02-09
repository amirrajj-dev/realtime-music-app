import { Box } from "@mui/material";
import { IMessage , IUser } from "../interfaces/interface";
import ChatBubbleSkeleton from "./skeletons/ChatBubbleSkeleton";
import MessageBubble from "./MessageBubble";

interface MessageSectionProps {
  messages: IMessage[];
  user: IUser | null;
  selectedUser: IUser;
  isLoading: boolean;
}

const MessageSection = ({ messages, user, selectedUser, isLoading }: MessageSectionProps) => {
  return (
    <Box
      className="scrollbar-thin"
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        padding: 2,
      }}
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <ChatBubbleSkeleton key={index} isCurrentUser={index % 2 === 0} />
          ))
        : messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={message}
              user={user!}
              selectedUser={selectedUser}
              isCurrentUser={message.senderId === user?.id}
            />
          ))}
    </Box>
  );
};

export default MessageSection;