import { createSlice } from '@reduxjs/toolkit';
import { ColumnsRecord, IColumn, ITask, MainState, TaskRecord, TasksRecord } from 'types';
import {
  getAllBoardsThunk,
  getBoardByIdThunk,
  deleteBoardThunk,
  deleteColumnThunk,
  deleteTaskThunk,
  DragNDropTaskThunk,
  getAllColumnsThunk,
  DragNDropTaskInOneColumnThunk,
  DragNDropColumnThunk,
  createNewColumnThunk,
  updateColumnThunk,
  updateTaskThunk,
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
      .addCase(deleteColumnThunk.fulfilled, (state, { payload: columnID }) => {
        delete state.columns[columnID];
        state.isLoading = false;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, { payload: values }) => {
        delete state.tasks[values.columnId][values.taskId];
        state.isLoading = false;
      })
      .addCase(DragNDropTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = generateHashMapTasks(payload.columns);
      })
      .addCase(DragNDropTaskInOneColumnThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasks = generateHashMapTasks(payload.columns);
      })
      .addCase(DragNDropColumnThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.columns = generateHashMapColumn(payload.columns);
      })
      .addCase(createNewColumnThunk.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.columns = generateHashMapColumn(payload.columns);
        state.tasks = generateHashMapTasks(payload.columns);
      })
      .addCase(updateColumnThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.columns = generateHashMapColumn(payload.columns);
      })
      .addCase(updateTaskThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.columns = generateHashMapColumn(payload.columns);
        state.tasks = generateHashMapTasks(payload.columns);
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
