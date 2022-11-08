import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';

const reducer = combineReducers({ mainReducer });

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
