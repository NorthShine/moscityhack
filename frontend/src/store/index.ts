import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { injectApiInterceptors } from '../api';
import { alertReducer } from './reducers/alert/alertReducer';
import { analyticsReducer } from './reducers/analytics/analyticsSlice';
import { authReducer } from './reducers/auth/authSlice';
import { loaderReducer } from './reducers/loader/loaderReducer';
import { modalReducer } from './reducers/modal/modalReducer';
import { newsReducer } from './reducers/news/newsSlice';
import { trustbadgeReducer } from './reducers/trustbadge/trustbadgeSlice';
import { whitelistReducer } from './reducers/whitelist/whitelistSlice';

const rootReducer = combineReducers({
  news: newsReducer,
  auth: authReducer,
  whitelist: whitelistReducer,
  alert: alertReducer,
  loader: loaderReducer,
  modal: modalReducer,
  trustbadge: trustbadgeReducer,
  analytics: analyticsReducer
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export const store = setupStore();

injectApiInterceptors(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
