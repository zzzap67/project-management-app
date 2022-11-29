import { API_URL } from 'const';
import { EApiMethods, IBoard, IColumn, ICreateUser, ISignIn, ITask, IUser } from 'types';

interface IApi {
  baseUrl: string;
  token?: string;
}

class Api implements IApi {
  baseUrl;
  token: string | undefined;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  setConfig({
    method = 'GET',
    headers = {},
    body = null,
  }: {
    method?: string;
    headers?: HeadersInit;
    body?: unknown;
  }): RequestInit {
    const config: RequestInit = {
      method: method ? method : EApiMethods.get,
      headers: headers
        ? {
            'Content-Type': 'application/json',
            ...headers,
          }
        : {
            'Content-Type': 'application/json',
          },
    };

    if (this.token) {
      config.headers = {
        Authorization: `Bearer ${this.token}`,
        ...config.headers,
      };
    }

    if (body) {
      config.body = JSON.stringify(body);
    }

    return config;
  }

  async postSignUp(body: ICreateUser | Record<string, string>) {
    let foundData: IUser | null = null;
    try {
      const response = await fetch(
        `${this.baseUrl}/signup`,
        this.setConfig({ method: EApiMethods.post, body: body as ICreateUser })
      );
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async postSignIn(body: Omit<ICreateUser, 'name'>) {
    let foundData: ISignIn | null = null;
    try {
      const response = await fetch(
        `${this.baseUrl}/signin`,
        this.setConfig({ method: EApiMethods.post, body: body as Omit<ICreateUser, 'name'> })
      );
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getUserById(id: string) {
    let foundData: IUser | null = null;
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, this.setConfig({}));
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getAllBoards() {
    let foundData: IBoard[] = [];
    try {
      const response = await fetch(`${this.baseUrl}/boards`, this.setConfig({}));
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getAllColumns(id: string) {
    let foundData: IColumn[] = [];
    try {
      const response = await fetch(`${this.baseUrl}/boards/${id}/columns`, this.setConfig({}));
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getAllTasks(values: Record<string, string>) {
    let foundData: ITask[] = [];
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.columnId}/tasks`,
        this.setConfig({})
      );
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getBoardId(id: string) {
    let foundData;
    try {
      const response = await fetch(`${this.baseUrl}/boards/${id}`, this.setConfig({}));
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async deleteBoard(id: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${id}`,
        this.setConfig({ method: EApiMethods.delete, body: id })
      );
      if (response.ok) {
        return id;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async deleteColumn(values: Record<string, string>) {
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.columnId}`,
        this.setConfig({ method: EApiMethods.delete, body: values.columnId })
      );
      if (response.ok) {
        return values.columnId;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async deleteTask(values: Record<string, string>) {
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.columnId}/tasks/${values.taskId}`,
        this.setConfig({ method: EApiMethods.delete, body: values.taskId })
      );
      if (response.ok) {
        return values;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async deleteTaskFromSourceColumn(values: Record<string, string>) {
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.fromColumn}/tasks/${values.taskId}`,
        this.setConfig({ method: EApiMethods.delete, body: values.taskId })
      );
      if (response.ok) {
        return values;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getColumnId(id: string) {
    let foundData: IColumn;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${id}/columns/${id}`,
        this.setConfig({})
      );
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async getTaskId(id: string) {
    let foundData: ITask;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${id}/columns/${id}/tasks/${id}`,
        this.setConfig({})
      );
      foundData = await response.json();

      if (response.ok) {
        return foundData;
      }

      throw foundData;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async createNewBoard(values: Record<string, string>) {
    let newBoard: IBoard;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards`,
        this.setConfig({
          method: 'POST',
          body: { title: values.title, description: values.description },
        })
      );
      newBoard = await response.json();
      if (response.ok) {
        return newBoard;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async createNewColumn(values: Record<string, string>) {
    let newColumn: IColumn;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.id}/columns`,
        this.setConfig({
          method: 'POST',
          body: { title: values.title },
        })
      );
      newColumn = await response.json();
      if (response.ok) {
        return newColumn;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async createNewTask(values: Record<string, string>) {
    let newTask;
    //: ITask;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.columnId}/tasks`,
        this.setConfig({
          method: 'POST',
          body: {
            title: values.title,
            description: values.description,
            userId: values.userId,
          },
        })
      );
      newTask = await response.json();
      if (response.ok) {
        return newTask;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }

  async updateTask(values: Record<string, string>) {
    let updateTask: ITask;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.columnId}/tasks/${values.taskId}`,
        this.setConfig({
          method: 'PUT',
          body: {
            title: values.title,
            description: values.description,
            userId: values.userId,
            order: values.order,
            boardId: values.boardId,
            columnId: values.columnId,
          },
        })
      );
      updateTask = await response.json();
      if (response.ok) {
        return updateTask;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async addTaskToDestinationColumn(values: Record<string, string>) {
    let updateTask: ITask;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.fromColumn}/tasks/${values.taskId}`,
        this.setConfig({
          method: 'PUT',
          body: {
            title: values.title,
            description: values.description,
            userId: values.userId,
            order: 1,
            boardId: values.boardId,
            columnId: values.toColumn,
          },
        })
      );
      updateTask = await response.json();
      if (response.ok) {
        return updateTask;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async moveTaskToDestinationOrder(values: Record<string, string>) {
    let updateTask;
    // : ITask;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.fromColumn}/tasks/${values.taskId}`,
        this.setConfig({
          method: 'PUT',
          body: {
            title: values.title,
            description: values.description,
            userId: values.userId,
            order: Number(values.destinationOrder),
            boardId: values.boardId,
            columnId: values.fromColumn,
          },
        })
      );
      updateTask = await response.json();
      if (response.ok) {
        return updateTask;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async updateColumnOrder(values: Record<string, string>) {
    let updateColumn: IColumn;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}/columns/${values.columnId}`,
        this.setConfig({
          method: 'PUT',
          body: {
            title: values.columnTitle,
            order: Number(values.columnDestinationOrder),
          },
        })
      );
      updateColumn = await response.json();
      if (response.ok) {
        return updateColumn;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
  async editBoard(values: Record<string, string>) {
    let editBoard;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.boardId}`,
        this.setConfig({
          method: 'PUT',
          body: {
            title: values.title,
            description: values.description,
            userId: values.userId,
          },
        })
      );
      editBoard = await response.json();
      if (response.ok) {
        return editBoard;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
}

export const api = new Api(API_URL);
