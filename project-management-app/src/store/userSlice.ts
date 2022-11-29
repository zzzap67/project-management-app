import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../types';
import { deleteUser, signIn, signUp, updateUser, userById } from './thunks';

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
  reducers: {
    signOut(state) {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        isAuth: true,
      }))
      .addCase(signIn.fulfilled, (state) => ({
        ...state,
        isAuth: true,
      }))
      .addCase(updateUser.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        isAuth: true,
      }))
      .addCase(userById.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
        isAuth: true,
      }))
      .addCase(deleteUser.fulfilled, () => initialState)
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

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
