import React, { useEffect } from 'react';
import List from '@mui/material/List';
import { useAppSelector } from 'hooks/useAppSelector';
import { useStyles } from 'hooks/useStyles';
import { WhitelistItem } from 'components/WhitelistItem';
import { Pagination } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import styles from './styles';
import { getWhitelistItemsAction } from '../../store/reducers/whitelist/actionCreators';

export const Whitelist: React.FC = () => {
  const {
    items,
    last_page,
    page,
    query,
    requesting,
    request
  } = useAppSelector((state) => state.whitelist);
  const dispatch = useAppDispatch();
  const css = useStyles(styles, 'Whitelist');

  // @ts-ignore
  const handlePageClick = (event, pageId: number) => {
    dispatch(getWhitelistItemsAction({
      q: query ?? '',
      page: pageId
    }));
  };

  useEffect(() => {
    if (request !== 'whitelist/getWhitelistItems' && !requesting) {
      dispatch(getWhitelistItemsAction({
        q: query ?? '',
        page: page ?? 1
      }));
    }
  }, [requesting, request]);

  return (
    <>
      <List css={css.root}>
        {items.map((props) => (
          <WhitelistItem key={props!.id} {...props} />
        ))}
      </List>
      {page && Boolean(items.length) && (
        <Pagination
          css={css.pagination}
          page={page ?? 1}
          boundaryCount={3}
          count={last_page}
          onChange={handlePageClick}
          color="primary"
        />
      )}
    </>
  );
};
