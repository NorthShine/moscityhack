import { Fade } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useStyles } from 'hooks/useStyles';
import React from 'react';
import { FADE_TIMEOUT } from '../../constants';
import styles from './styles';

export const Loader: React.FC = () => {
  const css = useStyles(styles, 'Loader');
  return (
    <Fade in timeout={FADE_TIMEOUT}>
      <div css={css.root}>
        <CircularProgress css={css.loader} />
      </div>
    </Fade>
  );
};
