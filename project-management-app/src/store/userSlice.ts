import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../types';
import { signUp } from './thunks';

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
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload: user }) => {
        state = {
          ...state,
          ...user,
          isAuth: true,
        };
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      }),
});

export default userSlice.reducer;
