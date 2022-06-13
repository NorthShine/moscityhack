import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToWhitelistAction, deleteWhitelistItemAction, getWhitelistItemsAction, updateWhitelistItemAction } from './actionCreators';
import { ApiError, WhitelistActionPayload, WhitelistItem } from '../../../types';
import { MAX_PAGE_ELEMENTS } from '../../../constants';

interface WhitelistState {
  items: WhitelistItem[];
  requesting: boolean;
  request: string;
  error: ApiError | null | undefined;
  per_page: number;
  last_page: number;
  page: number | null;
  query: string | undefined;
}

const initialState: WhitelistState = {
  items: [],
  requesting: false,
  request: '',
  error: null,
  per_page: MAX_PAGE_ELEMENTS,
  last_page: 0,
  page: 1,
  query: ''
};

export const filterWhitelistItemsAction = createAction<string>('whitelist/filterWhitelistItems');
export const enableWhitelistItemEditingAction = createAction<number>('whitelist/enableWhitelistItemEditing');
export const disableWhitelistItemEditingAction = createAction<number>('whitelist/disableWhitelistItemEditing');

export const whitelistSlice = createSlice({
  name: 'whitelist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(enableWhitelistItemEditingAction, (state, action) => {
      const id = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item, editing: true
          };
        }
        return item;
      });
    });

    builder.addCase(disableWhitelistItemEditingAction, (state, action) => {
      const id = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          return {
            ...item, editing: false
          };
        }
        return item;
      });
    });

    builder.addCase(
      getWhitelistItemsAction.fulfilled,
      (state, action: PayloadAction<WhitelistActionPayload>) => {
        state.requesting = false;
        state.error = null;
        const {
          data: items,
          per_page,
          last_page,
          page,
          query
        } = action.payload;
        state.per_page = per_page;
        state.last_page = last_page;
        state.page = page;
        state.query = query;
        state.items = items.map((item) => ({
          ...item,
          editing: false
        }));
      }
    );
    builder.addCase(getWhitelistItemsAction.pending, (state) => {
      state.requesting = true;
      state.request = 'whitelist/getWhitelistItems';
    });
    builder.addCase(getWhitelistItemsAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });

    builder.addCase(
      addToWhitelistAction.fulfilled,
      (state) => {
        state.requesting = false;
        state.error = null;
      }
    );
    builder.addCase(addToWhitelistAction.pending, (state) => {
      state.requesting = true;
      state.request = 'whitelist/addToWhitelist';
    });
    builder.addCase(addToWhitelistAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });

    builder.addCase(
      deleteWhitelistItemAction.fulfilled,
      (state) => {
        state.requesting = false;
        state.error = null;
      }
    );
    builder.addCase(deleteWhitelistItemAction.pending, (state) => {
      state.requesting = true;
      state.request = 'whitelist/deleteWhitelistItem';
    });
    builder.addCase(deleteWhitelistItemAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });

    builder.addCase(
      updateWhitelistItemAction.fulfilled,
      (state, action: PayloadAction<WhitelistItem>) => {
        const { id, url } = action.payload;
        state.items = state.items.map((item) => {
          if (item.id === id) {
            return { ...item, url, editing: false };
          }
          return item;
        });
      }
    );
    builder.addCase(updateWhitelistItemAction.pending, (state) => {
      state.requesting = true;
      state.request = 'whitelist/updateWhitelistItem';
    });
    builder.addCase(updateWhitelistItemAction.rejected, (state, action) => {
      state.requesting = false;
      state.error = action.payload;
    });
  }
});

export const whitelistReducer = whitelistSlice.reducer;
