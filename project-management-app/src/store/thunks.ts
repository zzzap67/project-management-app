import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const getAllBoardsThunk = createAsyncThunk('main/getAllBoardsThunk', async () => {
  return await api.getAllBoards();
});

export const getBoardByIdThunk = createAsyncThunk('main/getBoardByIdThunk', async (id: string) => {
  return await api.getBoardId(id);
});

export const deleteBoardThunk = createAsyncThunk('main/deleteBoardThunk', async (id: string) => {
  return await api.deleteBoard(id);
});
