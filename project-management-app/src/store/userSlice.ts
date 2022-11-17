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
      .addCase(signUp.fulfilled, (state, { payload: user }) => {
        state = {
          ...state,
          ...user,
          isAuth: true,
        };
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        console.log('payload: ', payload);
        // state = {
        //   ...state,
        //   isAuth: true,
        // };
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => ({
          ...state,
          error: null,
          isLoading: true,
        })
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, { error }) => {
          if (error.message) {
            state.error = error.message;
          }
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      ),
});

export default userSlice.reducer;
