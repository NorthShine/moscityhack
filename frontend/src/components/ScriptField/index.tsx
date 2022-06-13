import { Paper } from '@mui/material';
import { useAlert } from 'hooks/useAlert';
import { useStyles } from 'hooks/useStyles';
import React from 'react';
import styles from './styles';

interface ScriptFieldProps {
  script: string;
}

export const ScriptField: React.FC<ScriptFieldProps> = (props) => {
  const { script } = props;
  const css = useStyles(styles, 'ScriptField');
  const alert = useAlert();

  const copyToClipboard = async () => {
    try {
      const permissionName = 'clipboard-write' as PermissionName; //eslint-disable-line
      const permissionStatus = await navigator.permissions.query({ name: permissionName });
      const allowedStatuses = ['granted', 'prompt'];
      if (allowedStatuses.includes(permissionStatus.state)) {
        await navigator.clipboard.writeText(script);
        alert.success('Код успешно скопирован!');
      }
    } catch (err) {
      alert.error('Ошибка копирования!');
    }
  };

  return (
    <Paper
      css={css.root}
      elevation={0}
      onClick={copyToClipboard}
    >
      {script}
    </Paper>
  );
};
