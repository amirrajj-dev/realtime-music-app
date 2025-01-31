import { TextField, Button, Typography , Box } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'Background.default',
        color: 'text.primary',
        padding : '10px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{display : 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
            <img src="public/app-logo/icons8-music-64.svg" alt="" />
        </Box>
        <Typography variant="h4" align="center" className='text-emerald-600' gutterBottom>
          Welcome Back
        </Typography>
        <Box component="form" noValidate>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Email sx={{ marginRight: 1, color: 'text.secondary' }} />
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <Lock sx={{ marginRight: 1, color: 'text.secondary' }} />
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginY: 2,
              color: 'white',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Sign In
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link to="/signup" className='hover:underline text-emerald-600'>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;