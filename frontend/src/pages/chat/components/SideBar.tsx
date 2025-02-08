import React from 'react';
import { Box, List, ListItem, Avatar, Divider, Tooltip, Skeleton, useTheme, useMediaQuery } from '@mui/material';
import { IUser } from '../../../interfaces/interface';

const Sidebar = ({ users, selectUser, loading } : {users : IUser[], selectUser : (user : IUser)=>void, loading: boolean}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        width : '13%',
      }}
    >
      <List>
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ padding: '8px', borderRadius: '8px' }}>
                <Skeleton variant="circular" width={45} height={45} />
                <Divider/>
              </Box>
            ))}
          </>
        ) : (
          users.map(user => (
            <Box key={user._id} sx={{ padding: '8px' , borderRadius: '8px', '&:hover': { backgroundColor: theme.palette.action.hover , cursor : 'pointer' } }}>
              <Tooltip title={user.fullname} placement="right" sx={{display : 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
                <ListItem button onClick={() => selectUser(user)}>
                  <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                    {user.fullname.split(" ")[0][0]}
                  </Avatar>
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

export default Sidebar;