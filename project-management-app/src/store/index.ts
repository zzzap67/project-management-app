import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';
import userReducer from './userSlice';

const reducer = combineReducers({ mainReducer, userReducer });

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
