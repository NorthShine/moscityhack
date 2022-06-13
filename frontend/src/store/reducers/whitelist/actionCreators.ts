import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  PatchWhitelistItemRequest,
  UrlRequest,
  WhitelistActionPayload,
  WhitelistItem,
  WhitelistRequest
} from 'types';
import api from '../../../api';

export const getWhitelistItemsAction = createAsyncThunk<
  WhitelistActionPayload, WhitelistRequest, { rejectValue: ApiResponse }>(
    'whitelist/getWhitelistItems',
    async (param, { rejectWithValue }) => {
      try {
        const query = param?.q;
        const response = await api.getWhitelistItems(param);
        return { ...response.data, query } as WhitelistActionPayload;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );

export const addToWhitelistAction = createAsyncThunk<
  WhitelistItem, UrlRequest, { rejectValue: ApiResponse }>(
    'whitelist/addToWhitelist',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.addToWhitelist(data);
        return response.data as WhitelistItem;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );

export const deleteWhitelistItemAction = createAsyncThunk<
  number, number, { rejectValue: ApiResponse }>(
    'whitelist/deleteWhitelistItem',
    async (id, { rejectWithValue }) => {
      try {
        await api.deleteWhitelistItem(id);
        return id;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );

export const updateWhitelistItemAction = createAsyncThunk<
  WhitelistItem, PatchWhitelistItemRequest, { rejectValue: ApiResponse }>(
    'whitelist/updateWhitelistItem',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.patchWhitelistItem(data);
        return response.data as WhitelistItem;
      } catch (error) {
        const err = (error as ApiResponse);
        return rejectWithValue({
          status: err.status,
          message: err.message
        });
      }
    }
  );
