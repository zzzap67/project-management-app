import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectAnyError = createSelector(
  (state: RootState) => state.mainReducer.error,
  (state: RootState) => state.userReducer.error,
  (errorMain, errorUser) => {
    return errorMain || errorUser;
  }
);

export const selectAnyLoading = createSelector(
  (state: RootState) => state.mainReducer.isLoading,
  (state: RootState) => state.userReducer.isLoading,
  (loadingMain, loadingUser) => {
    return loadingMain || loadingUser;
  }
);
