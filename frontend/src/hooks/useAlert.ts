import { closeAlertAction, openAlertAction } from '../store/reducers/alert/alertReducer';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useAlert = () => {
  const { open, severity, message } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  function closeAlert() {
    dispatch(closeAlertAction());
  }

  function warning(msg: string) {
    dispatch(openAlertAction({
      message: msg,
      severity: 'warning'
    }));
  }

  function error(msg: string) {
    dispatch(openAlertAction({
      message: msg,
      severity: 'error'
    }));
  }

  function info(msg: string) {
    dispatch(openAlertAction({
      message: msg,
      severity: 'info'
    }));
  }

  function success(msg: string) {
    dispatch(openAlertAction({
      message: msg,
      severity: 'success'
    }));
  }

  return {
    open,
    closeAlert,
    message,
    severity,
    warning,
    success,
    info,
    error
  };
};
