import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiError, Analytics } from '../../../types';
import { getAnalyticsAction } from './actionCreators';

interface AnalyticsState {
  data: Analytics[];
  requesting: boolean;
  error: ApiError | null | undefined;
}

const initialState: AnalyticsState = {
  data: [],
  requesting: false,
  error: null
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnalyticsAction.fulfilled, (state, action: PayloadAction<Analytics[]>) => {
      state.requesting = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getAnalyticsAction.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(getAnalyticsAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });
  }
});

export const analyticsReducer = analyticsSlice.reducer;
