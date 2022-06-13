import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, TrustBadgeRequest, TrustBadgeResponse } from 'types';
import api from '../../../api';

export const getTrustBadgeScriptAction = createAsyncThunk<
  TrustBadgeResponse, TrustBadgeRequest, { rejectValue: ApiResponse }>(
    'trustbadge/getTrustBadgeScript',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.fetchTrustBadgeScript(data);
        return response.data as TrustBadgeResponse;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );
