import { Alert, Card, CardContent, Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from 'hooks/useAppSelector';
import { useStyles } from 'hooks/useStyles';
import React from 'react';
import styles from './styles';

const getResultLabelClass = (result: number) => {
  switch (true) {
    case result < 50:
      return 'error';
    case result > 51 && result < 89:
      return 'warning';
    default: {
      return 'success';
    }
  }
};

export const Info: React.FC = () => {
  const css = useStyles(styles, 'Info');
  const { data } = useAppSelector((state) => state.news);

  if (!data) return null;

  const {
    truth_percentage,
    title,
    url,
    text,
    is_article
  } = data;

  const resultClass = getResultLabelClass(truth_percentage);

  const resultStyles = [
    css.resultContainer,
    css[resultClass]
  ];

  return (
    <Card css={css.root}>
      <CardContent css={css.content}>
        <Container css={css.infoContainer}>
          <Typography align="left" variant="subtitle1" css={css.title}>{title}</Typography>
          {url
            && (
              <a target="_blank" css={css.link} href={url} rel="noreferrer">
                <Typography
                  align="left"
                  css={css.url}
                >
                  {url}
                </Typography>
              </a>
            )}
          <Typography align="left" css={css.text}>{text}</Typography>
        </Container>
        <Paper css={resultStyles}>
          <Typography css={css.result} variant="h3">{`${truth_percentage}%`}</Typography>
        </Paper>
      </CardContent>
      {(url && !is_article) && (
        <Alert css={css.alert} severity="error">
          Источник не является статьей!
        </Alert>
      )}
    </Card>
  );
};
