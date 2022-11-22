import { createSlice } from '@reduxjs/toolkit';
import { ColumnsRecord, IColumn, ITask, MainState, TaskRecord, TasksRecord } from 'types';
import {
  getAllBoardsThunk,
  getBoardByIdThunk,
  deleteBoardThunk,
  deleteColumnThunk,
  createNewTaskThunk,
  editBoardThunk,
  deleteTaskThunk,
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
  userId: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState: MAIN_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllBoardsThunk.fulfilled, (state, { payload: boards }) => {
        boards.forEach((board) => {
          state.boards[board.id] = board;
        });
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, { payload: board }) => {
        state.board = board;
        state.columns = board.columns.reduce((acc: ColumnsRecord, item: IColumn) => {
          acc[item.id] = item;
          return acc;
        }, {});
        state.tasks = board.columns.reduce((acc: TasksRecord, itemColumn: IColumn) => {
          acc[itemColumn.id] = itemColumn.tasks.reduce((acc: TaskRecord, itemTask: ITask) => {
            acc[itemTask.id] = itemTask;
            return acc;
          }, {});
          return acc;
        }, {});
      })
      .addCase(deleteBoardThunk.fulfilled, (state, { payload: boardID }) => {
        delete state.boards[boardID];
      })

      .addCase(createNewTaskThunk.fulfilled, (state, { payload: task }) => {
        state.isLoading = false;
      })
      .addCase(deleteColumnThunk.fulfilled, (state, { payload: columnID }) => {
        delete state.columns[columnID];
        state.isLoading = false;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, { payload: values }) => {
        delete state.tasks[values.columnId][values.taskId];
        state.isLoading = false;
      })
      .addCase(editBoardThunk.fulfilled, (state, { payload: board }) => {
        state.isLoading = false;
      })
      .addMatcher(
        ({ type }) => type.includes('main') && type.endsWith('/pending'),
        (state) => ({
          ...state,
          error: null,
          isLoading: true,
        })
      )
      .addMatcher(
        ({ type }) => type.includes('main') && type.endsWith('/rejected'),
        (state, { error }) => {
          if (error.message) {
            state.error = error.message;
          }
          state.isLoading = false;
        }
      )
      .addMatcher(
        ({ type }) => type.includes('main') && type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      ),
});

export default mainSlice.reducer;
