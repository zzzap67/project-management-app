import { createSlice } from '@reduxjs/toolkit';
import { ColumnsRecord, IColumn, ITask, MainState, TaskRecord, TasksRecord } from 'types';
import {
  getAllBoardsThunk,
  getBoardByIdThunk,
  deleteBoardThunk,
  deleteColumnThunk,
  createNewTaskThunk,
  createNewBoardThunk,
  editBoardThunk,
  editColumnThunk,
  deleteTaskThunk,
  createNewColumnThunk,
  DragNDropTaskThunk,
  getAllColumnsThunk,
  DragNDropTaskInOneColumnThunk,
  DragNDropColumnThunk,
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
const generateHashMapColumn = (columns: IColumn[]) => {
  return columns.reduce((acc: ColumnsRecord, item: IColumn) => {
    acc[item.id] = item;
    return acc;
  }, {});
};
const generateHashMapTasks = (columns: IColumn[]) => {
  return columns.reduce((acc: TasksRecord, itemColumn: IColumn) => {
    acc[itemColumn.id] = itemColumn.tasks.reduce((acc: TaskRecord, itemTask: ITask) => {
      acc[itemTask.id] = itemTask;
      return acc;
    }, {});
    return acc;
  }, {});
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
      .addCase(getAllColumnsThunk.fulfilled, (state, { payload: columns }) => {
        columns.forEach((column) => {
          state.columns[column.id] = column;
        });
      })
      .addCase(getBoardByIdThunk.fulfilled, (state, { payload: board }) => {
        state.board = board;
        state.columns = generateHashMapColumn(board.columns);
        state.tasks = generateHashMapTasks(board.columns);
      })
      .addCase(deleteBoardThunk.fulfilled, (state, { payload: boardID }) => {
        delete state.boards[boardID];
      })
      .addCase(createNewBoardThunk.fulfilled, (state, { payload: board }) => {
        state.boards[board.id] = board;
        state.isLoading = false;
      })
      .addCase(createNewColumnThunk.fulfilled, (state, { payload: column }) => {
        state.columns[column.id] = column;
        state.tasks[column.id] = {};
        state.isLoading = false;
      })
      .addCase(createNewTaskThunk.fulfilled, (state, { payload: task }) => {
        state.tasks[task.columnId][task.id] = task;
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
        state.boards[board.id].title = board.title;
        state.boards[board.id].description = board.description;
      })
      .addCase(editColumnThunk.fulfilled, (state, { payload: column }) => {
        state.isLoading = false;
        state.columns[column.id].title = column.title;
      })
      .addCase(DragNDropTaskThunk.fulfilled, (state, { payload }) => {
        state.tasks = generateHashMapTasks(payload.columns);
        state.isLoading = false;
      })
      .addCase(DragNDropTaskInOneColumnThunk.fulfilled, (state, { payload }) => {
        state.tasks = generateHashMapTasks(payload.columns);
        state.isLoading = false;
      })
      .addCase(DragNDropColumnThunk.fulfilled, (state, { payload }) => {
        state.columns = generateHashMapColumn(payload.columns);
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
