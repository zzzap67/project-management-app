import { createSlice } from '@reduxjs/toolkit';
import { MainState } from 'types';
import {
  getAllBoardsThunk,
  getAllColumnsThunk,
  getAllTasksThunk,
  getBoardByIdThunk,
  getColumnByIdThunk,
  getTaskByIdThunk,
} from './thunks';

const MAIN_INITIAL_STATE: MainState = {
  isLoading: false,
  boards: {},
  board: null,
  error: null,
  columns: {},
  column: null,
  tasks: {},
  task: null,
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

      // Включаем лоадер
      .addCase(getAllColumnsThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(getAllColumnsThunk.fulfilled, (state, { payload: columns }) => {
        columns.forEach((column) => {
          state.columns[column.id] = column;
        });

        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(getAllColumnsThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      })
      .addCase(getColumnByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(getColumnByIdThunk.fulfilled, (state, { payload: column }) => {
        state.column = column;
        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(getColumnByIdThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      })

      // Включаем лоадер
      .addCase(getAllTasksThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(getAllTasksThunk.fulfilled, (state, { payload: tasks }) => {
        tasks.forEach((task) => {
          state.tasks[task.id] = task;
        });

        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(getAllTasksThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      })
      .addCase(getTaskByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      // Изменяем state при успешном запросе
      .addCase(getTaskByIdThunk.fulfilled, (state, { payload: task }) => {
        state.task = task;
        state.isLoading = false;
      })
      // Показываем ошибку при неуспешном запросе
      .addCase(getTaskByIdThunk.rejected, (state, { error }) => {
        if (error.message) {
          state.error = error.message;
        }
        state.isLoading = false;
      }),
});

export const { cleanErrorState } = mainSlice.actions;
export default mainSlice.reducer;
