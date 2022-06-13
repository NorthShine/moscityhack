import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiError, News } from '../../../types';
import { checkTextAction, checkUrlAction } from './actionCreators';

interface NewsState {
  data: News | null;
  requesting: boolean;
  error: ApiError | null | undefined;
}

const initialState: NewsState = {
  data: null,
  requesting: false,
  error: null
};

export const newsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUrlAction.fulfilled, (state, action: PayloadAction<News>) => {
      state.requesting = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(checkUrlAction.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(checkUrlAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });

    builder.addCase(checkTextAction.fulfilled, (state, action: PayloadAction<News>) => {
      state.requesting = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(checkTextAction.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(checkTextAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });
  }
});

export const newsReducer = newsSlice.reducer;
