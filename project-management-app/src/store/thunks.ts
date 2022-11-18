import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { ICreateUser } from '../types';

export const signUp = createAsyncThunk(
  'user/signUp',
  async (body: ICreateUser | Record<string, string>) => {
    return await api.postSignUp(body);
  }
);

export const signIn = createAsyncThunk('user/signIn', async (body: Omit<ICreateUser, 'name'>) => {
  return await api.postSignIn(body);
});

export const userById = createAsyncThunk('user/userById', async (id: string) => {
  return await api.getUserById(id);
});

export const getAllBoardsThunk = createAsyncThunk('main/getAllBoardsThunk', async () => {
  return await api.getAllBoards();
});

export const getAllColumnsThunk = createAsyncThunk(
  'main/getAllColumnsThunk',
  async (id: string) => {
    return await api.getAllColumns(id);
  }
);
export const getAllTasksThunk = createAsyncThunk('main/getAllTasksThunk', async (id: string) => {
  return await api.getAllTasks(id);
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
export const getTaskByIdThunk = createAsyncThunk('main/getTaskByIdThunk', async (id: string) => {
  return await api.getTaskId(id);
});

export const deleteBoardThunk = createAsyncThunk('main/deleteBoardThunk', async (id: string) => {
  return await api.deleteBoard(id);
});
