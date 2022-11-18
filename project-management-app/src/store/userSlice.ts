import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../types';
import { signIn, signUp } from './thunks';

const initialState: IUserState = {
  isAuth: false,
  id: '',
  name: '',
  login: '',
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
      }))
      .addCase(signIn.fulfilled, (state) => ({
        ...state,
        isAuth: true,
      }))
      .addMatcher(
        ({ type }) => type.includes('user') && type.endsWith('/pending'),
        (state) => ({
          ...state,
          error: null,
          isLoading: true,
        })
      )
      .addMatcher(
        ({ type }) => type.includes('user') && type.endsWith('/rejected'),
        (state, { error }) => {
          if (error.message) {
            state.error = error.message;
          }
          state.isLoading = false;
        }
      )
      .addMatcher(
        ({ type }) => type.includes('user') && type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      ),
});

export default userSlice.reducer;
