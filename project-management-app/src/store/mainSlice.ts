import { createSlice } from '@reduxjs/toolkit';
import { ColumnsRecord, IColumn, ITask, MainState, TaskRecord, TasksRecord } from 'types';
import {
  getAllBoardsThunk,
  getBoardByIdThunk,
  deleteBoardThunk,
  // getAllColumnsThunk,
  // getAllTasksThunk,
  // getColumnByIdThunk,
  // getTaskByIdThunk,
  // createNewBoardThunk,
  // createNewColumnThunk,
  deleteColumnThunk,
  createNewTaskThunk,
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
      // .addCase(getAllColumnsThunk.fulfilled, (state, { payload: columns }) => {
      //   columns.forEach((column) => {
      //     state.columns[column.id] = column;
      //   });
      // })
      // .addCase(getColumnByIdThunk.fulfilled, (state, { payload: column }) => {
      //   state.column = column;
      // })
      // .addCase(getAllTasksThunk.fulfilled, (state, { payload: tasks }) => {
      //   tasks.forEach((task) => {
      //     state.tasks[task.id] = task;
      //   });
      // })
      // .addCase(getTaskByIdThunk.fulfilled, (state, { payload: task }) => {
      //   state.task = task;
      // })

      // Изменяем state при успешном запросе
      // .addCase(createNewBoardThunk.fulfilled, (state, { payload: board }) => {
      //   // state.boards = { ...state.boards, board };
      //   state.isLoading = false;
      // })
      .addCase(createNewTaskThunk.fulfilled, (state, { payload: task }) => {
        state.tasks = { ...state.tasks, task };
        state.isLoading = false;
      })
      .addCase(deleteColumnThunk.fulfilled, (state, { payload: columnID }) => {
        delete state.columns[columnID];
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
