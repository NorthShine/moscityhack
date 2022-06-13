import { createAction, createReducer } from '@reduxjs/toolkit';
import { getAuthAction } from '../auth/actionCreators';
import { checkTextAction, checkUrlAction } from '../news/actionCreators';
import { addToWhitelistAction, deleteWhitelistItemAction, getWhitelistItemsAction } from '../whitelist/actionCreators';

interface LoaderState {
  loading: boolean
}

const initialState: LoaderState = {
  loading: false
};

export const setLoadingAction = createAction<boolean>('loader/setLoading');

const startLoading = (state: LoaderState) => {
  state.loading = true;
};

const stopLoading = (state: LoaderState) => {
  state.loading = false;
};

export const loaderReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoadingAction, (state, action) => {
    state.loading = action.payload;
  });

  // custom loader cases
  builder.addCase(getAuthAction.pending, startLoading);
  builder.addCase(getAuthAction.fulfilled, stopLoading);
  builder.addCase(getAuthAction.rejected, stopLoading);

  builder.addCase(getWhitelistItemsAction.pending, startLoading);
  builder.addCase(getWhitelistItemsAction.fulfilled, stopLoading);
  builder.addCase(getWhitelistItemsAction.rejected, stopLoading);

  builder.addCase(addToWhitelistAction.pending, startLoading);
  builder.addCase(addToWhitelistAction.fulfilled, stopLoading);
  builder.addCase(addToWhitelistAction.rejected, stopLoading);

  builder.addCase(deleteWhitelistItemAction.pending, startLoading);
  builder.addCase(deleteWhitelistItemAction.fulfilled, stopLoading);
  builder.addCase(deleteWhitelistItemAction.rejected, stopLoading);

  builder.addCase(checkUrlAction.pending, startLoading);
  builder.addCase(checkUrlAction.fulfilled, stopLoading);
  builder.addCase(checkUrlAction.rejected, stopLoading);

  builder.addCase(checkTextAction.pending, startLoading);
  builder.addCase(checkTextAction.fulfilled, stopLoading);
  builder.addCase(checkTextAction.rejected, stopLoading);
});
