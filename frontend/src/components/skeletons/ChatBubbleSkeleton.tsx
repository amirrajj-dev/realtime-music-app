import { Box, Paper, Skeleton } from "@mui/material";

const ChatBubbleSkeleton = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isCurrentUser ? "row-reverse" : "row",
        alignItems: "center",
        marginBottom: 1.5,
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Paper
        sx={{
          padding: 2,
          maxWidth: "60%",
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
          marginLeft: isCurrentUser ? "0px" : "8px",
          marginRight: isCurrentUser ? "8px" : "0px",
        }}
      >
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" width={100} height={15} />
      </Paper>
    </Box>
  );
};

export default ChatBubbleSkeleton;