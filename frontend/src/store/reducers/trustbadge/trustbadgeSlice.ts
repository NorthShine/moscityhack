import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTrustBadgeScriptAction } from './actionCreators';
import { ApiError, TrustBadgeResponse } from '../../../types';

interface TrustBadgeState {
  script: string;
  requesting: boolean;
  error: ApiError | null | undefined;
}

const initialState: TrustBadgeState = {
  script: '',
  requesting: false,
  error: null
};

export const trustbadgeSlice = createSlice({
  name: 'trustbadge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTrustBadgeScriptAction.fulfilled,
      (state, action: PayloadAction<TrustBadgeResponse>) => {
        state.requesting = false;
        state.error = null;
        const { script } = action.payload;
        state.script = script;
      }
    );
    builder.addCase(getTrustBadgeScriptAction.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(getTrustBadgeScriptAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });
  }
});

export const trustbadgeReducer = trustbadgeSlice.reducer;
