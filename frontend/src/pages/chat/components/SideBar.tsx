import { memo, useCallback } from 'react';
import { Box, List, ListItem, Avatar, Divider, Tooltip, Skeleton, Badge, useTheme, useMediaQuery } from '@mui/material';
import { IUser } from '../../../interfaces/interface';
import { useChatStore } from '../../../store/useChat';

interface SidebarProps {
  users: IUser[];
  selectUser: (user: IUser) => void;
  loading: boolean;
  isMobile: boolean;
}

const Sidebar = ({ users, selectUser, loading, isMobile }: SidebarProps) => {
  const theme = useTheme();
  const { onlineUsers } = useChatStore();

  const handleSelectUser = useCallback((user: IUser) => {
    selectUser(user);
  }, [selectUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '10px' : '20px',
        padding: isMobile ? '8px' : '16px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: 3,
        width: isMobile ? '100%' : '20%',
      }}
    >
      <List>
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ padding: '8px', borderRadius: '8px' }}>
                <Skeleton variant="circular" width={45} height={45} />
                <Divider />
              </Box>
            ))}
          </>
        ) : (
          users.map(user => (
            <Box
              key={user._id}
              sx={{
                padding: '8px',
                borderRadius: '8px',
                '&:hover': { backgroundColor: theme.palette.action.hover, cursor: 'pointer' },
              }}
            >
              <Tooltip title={user.fullname} placement="right" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ListItem onClick={() => handleSelectUser(user)}>
                  <Badge
                    color="info"
                    variant="dot"
                    invisible={!onlineUsers.has(String(user._id))}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                      {user.fullname.split(" ")[0][0]}
                    </Avatar>
                  </Badge>
                </ListItem>
              </Tooltip>
              <Divider />
            </Box>
          ))
        )}
      </List>
    </Box>
  );
};

export default memo(Sidebar);