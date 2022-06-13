import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';
import { ApiResponse, News, TextRequest, UrlRequest } from '../../../types';

export const checkUrlAction = createAsyncThunk<
  News, UrlRequest, { rejectValue: ApiResponse }>(
    'news/checkUrl',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.checkURL(data);
        return response.data.data;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );

export const checkTextAction = createAsyncThunk<
  News, TextRequest, { rejectValue: ApiResponse }>(
    'news/checkText',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.checkText(data);
        return response.data.data;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );
