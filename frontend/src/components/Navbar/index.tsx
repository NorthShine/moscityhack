import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { useStyles } from 'hooks/useStyles';
import { GradientButton } from '../../ui/GradientButton';
import { signOutAction } from '../../store/reducers/auth/authSlice';
import Logo from '../../assets/images/logo.png';
import styles from './styles';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const css = useStyles(styles, 'Navbar');

  const handleLogin = () => {
    if (token) {
      dispatch(signOutAction());
    } else {
      navigate('/login');
    }
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <img
            role="presentation"
            css={css.logo}
            onClick={handleClick}
            alt="Logo"
            src={Logo}
          />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            NorthShine
          </Typography>
          <GradientButton
            variant="contained"
            color="secondary"
            onClick={handleLogin}
          >
            {token ? 'Выйти' : 'Войти'}
          </GradientButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
