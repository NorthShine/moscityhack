import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { ScriptField } from 'components/ScriptField';
import { useAppSelector } from 'hooks/useAppSelector';
import { useStyles } from 'hooks/useStyles';
import React from 'react';
import TrustBadge from '../../assets/images/trustbadge.png';
import styles from './styles';

export const TrustBadgeModal: React.FC = () => {
  const { script } = useAppSelector((state) => state.trustbadge);
  const css = useStyles(styles, 'TrustBadgeModal');

  return (
    <Container>
      <Typography>
        Чтобы люди видели, что ваш сайт проверен нашим сервисом,
        вы можете добавить Trust Badge:
      </Typography>
      <Container css={css.trustbadge}>
        <img css={css.image} alt="trustbadge" src={TrustBadge} />
      </Container>
      <Typography>
        {`Скопируйте код,
          чтобы Trust Badge отобразился на вашем сайте
          и вставьте его в <head> страницы:`}
      </Typography>
      <ScriptField script={script} />
      <Typography>Поставьте этот HTML-код в месте, где вы хотите отобразить Trust Badge</Typography>
      <ScriptField script={'<div class="__trustbadge__"></div>'} />
    </Container>
  );
};
