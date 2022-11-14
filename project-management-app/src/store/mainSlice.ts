import { createSlice } from '@reduxjs/toolkit';
import { MainState, IBoard } from 'types';
import { getAllBoardsThunk, getBoardByIdThunk, deleteBoardThunk } from './thunks';

const MAIN_INITIAL_STATE: MainState = {
  isLoading: false,
  boards: {},
  board: null,
  error: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState: MAIN_INITIAL_STATE,
  reducers: {
    cleanErrorState(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      // Включаем лоадер
      .addCase(getAllBoardsThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(getAllBoardsThunk.fulfilled, (state, { payload: boards }) => {
        boards.forEach((board) => {
          state.boards[board.id] = board;
        });

        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(getAllBoardsThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      })
      .addCase(getBoardByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(getBoardByIdThunk.fulfilled, (state, { payload: board }) => {
        state.board = board;
        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(getBoardByIdThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      })
      .addCase(deleteBoardThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(deleteBoardThunk.fulfilled, (state, { payload: boardID }) => {
        delete state.boards[boardID];
        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(deleteBoardThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      }),
});

export const { cleanErrorState } = mainSlice.actions;
export default mainSlice.reducer;
