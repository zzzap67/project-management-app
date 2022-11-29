import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { ICreateUser, IEditColumn } from '../types';

export const signUp = createAsyncThunk(
  'user/signUp',
  async (body: ICreateUser | Record<string, string>) => {
    return await api.postSignUp(body);
  }
);

export const signIn = createAsyncThunk('user/signIn', async (body: Omit<ICreateUser, 'name'>) => {
  return await api.postSignIn(body);
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (body: ICreateUser & Record<'id', string>) => {
    return await api.putUser(body);
  }
);

export const userById = createAsyncThunk('user/userById', async (id: string) => {
  return await api.getUserById(id);
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string) => {
  return await api.deleteUserById(id);
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
export const getAllTasksThunk = createAsyncThunk(
  'main/getAllTasksThunk',
  async (values: Record<string, string>) => {
    return await api.getAllTasks(values);
  }
);
export const updateTaskThunk = createAsyncThunk(
  'main/updateTaskThunk',
  async (values: Record<string, string>) => {
    return await api.updateTask(values);
  }
);

export const DragNDropTaskThunk = createAsyncThunk(
  'main/updateTaskColumnThunk',
  async (values: Record<string, string>) => {
    await api.addTaskToDestinationColumn(values);
    return await api.getBoardId(values.boardId);
  }
);
export const DragNDropTaskInOneColumnThunk = createAsyncThunk(
  'main/updateTaskOrderInColumnThunk',
  async (values: Record<string, string>) => {
    await api.moveTaskToDestinationOrder(values);
    return await api.getBoardId(values.boardId);
  }
);
export const DragNDropColumnThunk = createAsyncThunk(
  'main/updateColumnOrderThunk',
  async (values: Record<string, string>) => {
    await api.updateColumnOrder(values);
    return await api.getBoardId(values.boardId);
  }
);
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
export const deleteColumnThunk = createAsyncThunk(
  'main/deleteColumnThunk',
  async (values: Record<string, string>) => {
    return await api.deleteColumn(values);
  }
);
export const deleteTaskThunk = createAsyncThunk(
  'main/deleteTaskThunk',
  async (values: Record<string, string>) => {
    return await api.deleteTask(values);
  }
);

export const createNewBoardThunk = createAsyncThunk(
  'main/createNewBoardThunk',
  async (values: Record<string, string>) => {
    return await api.createNewBoard(values);
  }
);

export const createNewColumnThunk = createAsyncThunk(
  'main/createNewColumnThunk',
  async (values: Record<string, string>) => {
    return await api.createNewColumn(values);
  }
);
export const createNewTaskThunk = createAsyncThunk(
  'main/createNewTaskThunk',
  async (values: Record<string, string>) => {
    return await api.createNewTask(values);
  }
);
export const editBoardThunk = createAsyncThunk(
  'main/editBoardThunk',
  async (values: Record<string, string>) => {
    return await api.editBoard(values);
  }
);
export const editColumnThunk = createAsyncThunk(
  'main/editColumnThunk',
  async (values: IEditColumn) => {
    return await api.editColumn(values);
  }
);
