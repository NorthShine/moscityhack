import { Snackbar, SnackbarOrigin, Alert as Notification } from '@mui/material';
import { useAlert } from 'hooks/useAlert';
import { useMemo } from 'react';
import { DEFAULT_ALERT_TIMEOUT } from '../../constants';

export const Alert = () => {
  const { open, closeAlert, message, severity } = useAlert();

  const position: SnackbarOrigin = useMemo(() => ({
    vertical: 'top',
    horizontal: 'center'
  }), []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={DEFAULT_ALERT_TIMEOUT}
      onClose={closeAlert}
      anchorOrigin={position}
    >
      <Notification onClose={closeAlert} severity={severity}>
        {message}
      </Notification>
    </Snackbar>
  );
};
