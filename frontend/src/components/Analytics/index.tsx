import { useAppSelector } from 'hooks/useAppSelector';
import { useStyles } from 'hooks/useStyles';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import styles from './styles';

export const Analytics: React.FC = () => {
  const css = useStyles(styles, 'Analytics');
  const { data } = useAppSelector((state) => state.analytics);

  return (
    <>
      <Typography css={css.title}>Статистика проверок</Typography>
      <TableContainer css={css.root}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell css={css.key}>Ссылка</TableCell>
              <TableCell css={css.key} align="center">Проверок</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...data]
              .sort((a, b) => b.count - a.count)
              .map((item) => {
                const { url, count } = item;
                return (
                  <TableRow
                    key={url}
                    css={css.row}
                  >
                    <TableCell component="th" scope="row">
                      <a css={css.link} href={url} target="_blank" rel="noreferrer">
                        {url}
                      </a>
                    </TableCell>
                    <TableCell align="center">{count}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
