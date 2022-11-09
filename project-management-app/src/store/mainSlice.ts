import { createSlice } from '@reduxjs/toolkit';
import { MainState } from 'types';

const MAIN_INITIAL_STATE: MainState = {
  isLoading: false,
  boardsList: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState: MAIN_INITIAL_STATE,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
    setBoards(state, action) {
      state.boardsList = action.payload;
    },
  },
});

export const { startLoading, finishLoading, setBoards } = mainSlice.actions;
export default mainSlice.reducer;
