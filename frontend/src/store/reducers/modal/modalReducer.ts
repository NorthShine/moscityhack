import { createAction, createReducer } from '@reduxjs/toolkit';
import { getTrustBadgeScriptAction } from '../trustbadge/actionCreators';

interface ModalState {
  open: boolean;
  type: string | undefined;
}

const initialState: ModalState = {
  open: false,
  type: undefined
};

interface OpenModalAction {
  type: string;
}

export const openModalAction = createAction<OpenModalAction>('modal/openModal');
export const closeModalAction = createAction('modal/closeModal');

export const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(openModalAction, (state, action) => {
    const { type } = action.payload;
    state.open = true;
    state.type = type;
  });
  builder.addCase(closeModalAction, (state) => {
    state.open = false;
  });

  builder.addCase(getTrustBadgeScriptAction.fulfilled, (state, action) => {
    state.type = action.type;
    state.open = true;
  });
});
