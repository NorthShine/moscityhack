import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthRequest, AuthResponse, ApiResponse } from 'types';
import api from '../../../api';

export const getAuthAction = createAsyncThunk<
  AuthResponse, AuthRequest, { rejectValue: ApiResponse }>(
    'auth/getAuth',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.signin(data);
        return response.data as AuthResponse;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );
