import { useAppSelector } from 'hooks/useAppSelector';
import { useStyles } from 'hooks/useStyles';
import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import styles from './styles';

export const Articles: React.FC = () => {
  const css = useStyles(styles, 'Articles');
  const { data } = useAppSelector((state) => state.news);

  if (!data) {
    return null;
  }

  const { found_articles } = data;

  return (
    <>
      <Typography css={css.title}>Релевантные ресурсы</Typography>
      <List>
        {found_articles.map((url) => (
          <ListItem css={css.item} disablePadding>
            <ListItemButton>
              <a css={css.link} href={url} target="_blank" rel="noreferrer">
                <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={url} />
              </a>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};
