import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectAnyError = createSelector(
  (state: RootState) => state.mainReducer.error,
  (state: RootState) => state.userReducer.error,
  (errorMain, errorUser) => {
    // console.log(errorMain, errorUser);
    // console.log(errorMain || errorUser);
    return errorUser;
  }
);
