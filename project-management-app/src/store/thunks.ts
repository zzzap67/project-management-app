import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const getAllBoardsThunk = createAsyncThunk('main/getAllBoardsThunk', async () => {
  return await api.getAllBoards();
});

export const getAllColumnsThunk = createAsyncThunk('main/getAllColumnsThunk', async () => {
  return await api.getAllColumns();
});
export const getBoardByIdThunk = createAsyncThunk('main/getBoardByIdThunk', async (id: string) => {
  return await api.getBoardId(id);
});
export const getColumnByIdThunk = createAsyncThunk(
  'main/getColumnByIdThunk',
  async (id: string) => {
    return await api.getColumnId(id);
  }
);
