import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { ICreateUser } from '../types';

export const signUp = createAsyncThunk('main/getAllBoardsThunk', async (body: ICreateUser) => {
  return await api.postSignUp(body);
});

export const getAllBoardsThunk = createAsyncThunk('main/getAllBoardsThunk', async () => {
  return await api.getAllBoards();
});

export const getBoardByIdThunk = createAsyncThunk('main/getBoardByIdThunk', async (id: string) => {
  return await api.getBoardId(id);
});
