import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuthAction } from './actionCreators';
import { ApiError, AuthResponse } from '../../../types';

interface AuthState {
  token: string | undefined;
  requesting: boolean;
  error: ApiError | null | undefined;
}

const initialState: AuthState = {
  token: undefined,
  requesting: false,
  error: null
};

export const signOutAction = createAction('auth/signOut');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signOutAction, (state) => {
      state.token = undefined;
    });

    builder.addCase(getAuthAction.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.requesting = false;
      state.error = null;
      const { access_token: token } = action.payload;
      state.token = token;
    });
    builder.addCase(getAuthAction.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(getAuthAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });
  }
});

export const authReducer = authSlice.reducer;
