import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { ApiResponse, Analytics } from '../../../types';

export const getAnalyticsAction = createAsyncThunk<
  Analytics[], void, { rejectValue: ApiResponse }>(
    'analytics/getAnalytics',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.getAnalytics();
        return response.data;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );
