import React, { useCallback, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/VerifiedUser';
import IconButton from '@mui/material/IconButton';
import { Divider, TextField, Tooltip } from '@mui/material';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useStyles } from 'hooks/useStyles';
import { WhitelistItem as WhitelistItemProps } from 'types';
import { deleteWhitelistItemAction, updateWhitelistItemAction } from '../../store/reducers/whitelist/actionCreators';
import styles from './styles';
import { disableWhitelistItemEditingAction, enableWhitelistItemEditingAction } from '../../store/reducers/whitelist/whitelistSlice';
import { getTrustBadgeScriptAction } from '../../store/reducers/trustbadge/actionCreators';

export const WhitelistItem: React.FC<WhitelistItemProps> = (props) => {
  const { url, id, editing } = props;
  const dispatch = useAppDispatch();
  const css = useStyles(styles, 'Whitelist');
  const [value, setValue] = useState(url);

  const handleDeleteItem = useCallback(() => {
    const sure = window.confirm('Вы действительно хотите удалить URL?'); // eslint-disable-line
    if (sure) {
      dispatch(deleteWhitelistItemAction(id));
    }
  }, []);

  const handleSetItemEditing = useCallback(() => {
    dispatch(enableWhitelistItemEditingAction(id));
  }, []);

  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = (event.target as HTMLInputElement);
    setValue(target.value);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const data = { id, data: { new_url: value } };
    dispatch(updateWhitelistItemAction(data));
  };

  const handleClose = () => {
    dispatch(disableWhitelistItemEditingAction(id));
  };

  const handleGetTrustBadgeScript = () => {
    dispatch(getTrustBadgeScriptAction({ id }));
  };

  return (
    <>
      {editing ? (
        <form
          css={css.form}
          onSubmit={handleSave}
        >
          <TextField
            value={value}
            onChange={handleInputChange}
            label="Введите URL"
            fullWidth
            size="small"
            required
          />
          <IconButton
            color="primary"
            type="submit"
            edge="end"
            disableRipple
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            color="secondary"
            edge="end"
            disableRipple
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </form>
      )
        : (
          <ListItem
            css={css.listItem}
            disableGutters
            secondaryAction={(
              <>
                <Tooltip title="Создать TrustBadge*" placement="top" arrow>
                  <IconButton aria-label="comment" onClick={handleGetTrustBadgeScript}>
                    <VerifiedIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Редактировать" placement="top" arrow>
                  <IconButton aria-label="comment" onClick={handleSetItemEditing}>
                    <EditIcon color="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Удалить" placement="top" arrow>
                  <IconButton aria-label="comment" onClick={handleDeleteItem}>
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          >
            <ListItemText css={css.text} primary={url} />
          </ListItem>
        )}
      <Divider component="li" />
    </>
  );
};
