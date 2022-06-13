import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useStyles } from 'hooks/useStyles';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from 'hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { Info } from 'components/Info';
import { Articles } from 'components/Articles';
import { useQuery } from 'hooks/useQuery';
import { useAppDispatch } from 'hooks/useAppDispatch';
import styles from './styles';
import { checkUrlAction } from '../../store/reducers/news/actionCreators';

type ResultValue = string | Element | any;

interface Properties {
  is_real_article: string;
  is_real_author: string;
  is_trusted_url: string;
  uniqueness_hits: string;
  stats: string;
}

export const Result: React.FC = () => {
  const css = useStyles(styles, 'Result');
  const { data } = useAppSelector((state) => state.news);
  const query = useQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const url = query.get('url');
    if (!data && url) {
      dispatch(checkUrlAction({ url }));
    } else {
      navigate('/');
    }
  }, []);

  if (!data) {
    return null;
  }

  const properties: Properties = {
    is_real_article: 'Настоящая статья',
    is_real_author: 'Настоящий автор',
    is_trusted_url: 'Доверенный URL',
    uniqueness_hits: 'Уникальность статьи',
    stats: 'Провеки ресурса'
  };

  const {
    is_real_article,
    is_real_author,
    is_trusted_url,
    uniqueness_hits
  } = data;

  return (
    <Container css={css.root} maxWidth="sm">
      <Typography css={css.title} variant="h5">Результаты проверки</Typography>
      <Info />
      {data && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell css={css.key}>Параметр</TableCell>
                <TableCell css={css.key} align="center">Значение</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries({
                is_real_article,
                is_real_author,
                is_trusted_url,
                uniqueness_hits: `${uniqueness_hits}%`
              }).map(([key, value]) => {
                let result: ResultValue = value;
                if (typeof value === 'boolean') {
                  result = value
                    ? <CheckIcon color="primary" />
                    : <CancelIcon color="secondary" />;
                }
                return (
                  <TableRow
                    key={key}
                    css={css.row}
                  >
                    <TableCell component="th" scope="row">
                      {properties[key as keyof Properties]}
                    </TableCell>
                    <TableCell align="center">{result}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Articles />
    </Container>
  );
};
