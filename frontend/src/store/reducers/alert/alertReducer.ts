import { AlertColor } from '@mui/material';
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { getAuthAction } from '../auth/actionCreators';
import { checkTextAction, checkUrlAction } from '../news/actionCreators';
import { addToWhitelistAction, deleteWhitelistItemAction, getWhitelistItemsAction } from '../whitelist/actionCreators';

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertColor
}

const initialState: AlertState = {
  open: false,
  message: '',
  severity: 'info'
};

interface AlertPayload {
  severity: AlertColor;
  message: string;
}

export const openAlertAction = createAction<AlertPayload>('alert/openAlert');
export const closeAlertAction = createAction('alert/closeAlert');

interface ApiAlertContext {
  message?: string;
  severity: AlertColor;
}

function setApiAlert(
  this: ApiAlertContext,
  state: AlertState,
  action: PayloadAction<any>
) {
  const { message } = action.payload;
  state.message = this.message || message || '';
  state.open = true;
  state.severity = this.severity;
}

export const alertReducer = createReducer(initialState, (builder) => {
  builder.addCase(openAlertAction, (state, action) => {
    const { severity, message } = action.payload;
    state.open = true;
    state.severity = severity;
    state.message = message;
  });
  builder.addCase(closeAlertAction, (state) => {
    state.open = false;
  });

  // alert listeners

  builder.addCase(getAuthAction.rejected, setApiAlert.bind({
    severity: 'error',
    message: 'Ошибка авторизации'
  }));

  builder.addCase(getWhitelistItemsAction.rejected, setApiAlert.bind({
    severity: 'error'
  }));
  builder.addCase(addToWhitelistAction.rejected, setApiAlert.bind({
    severity: 'error'
  }));

  builder.addCase(
    deleteWhitelistItemAction.fulfilled,
    setApiAlert.bind({
      severity: 'success',
      message: 'Ресурс успешно удален!'
    })
  );
  builder.addCase(deleteWhitelistItemAction.rejected, setApiAlert.bind({
    severity: 'error'
  }));

  builder.addCase(checkUrlAction.rejected, setApiAlert.bind({
    severity: 'error'
  }));
  builder.addCase(checkTextAction.rejected, setApiAlert.bind({
    severity: 'error'
  }));
});
