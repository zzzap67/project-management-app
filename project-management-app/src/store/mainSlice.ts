import { createSlice } from '@reduxjs/toolkit';
import { MainState } from 'types';
import {
  getAllBoardsThunk,
  getBoardByIdThunk,
  deleteBoardThunk,
  getAllColumnsThunk,
  getAllTasksThunk,
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
    cleanMainError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllBoardsThunk.fulfilled, (state, { payload: boards }) => {
        boards.forEach((board) => {
          state.boards[board.id] = board;
        });
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, { payload: board }) => {
        state.board = board;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, { payload: boardID }) => {
        delete state.boards[boardID];
      })
      .addCase(getAllColumnsThunk.fulfilled, (state, { payload: columns }) => {
        columns.forEach((column) => {
          state.columns[column.id] = column;
        });
      })
      .addCase(getColumnByIdThunk.fulfilled, (state, { payload: column }) => {
        state.column = column;
      })
      .addCase(getAllTasksThunk.fulfilled, (state, { payload: tasks }) => {
        tasks.forEach((task) => {
          state.tasks[task.id] = task;
        });
      })
      .addCase(getTaskByIdThunk.fulfilled, (state, { payload: task }) => {
        state.task = task;
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

export const { cleanMainError } = mainSlice.actions;
export default mainSlice.reducer;
