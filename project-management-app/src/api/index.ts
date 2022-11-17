import { API_URL, AuthToken } from 'const';
import { IBoard, IColumn, ITask } from 'types';

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
      method: method ? method : 'GET',
      headers: headers
        ? {
            'Content-Type': 'application/json',
            ...headers,
          }
        : {
            //'Content-Type': 'application/json',
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
  async getAllTasks(id: string) {
    let foundData: ITask[] = [];
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${id}/columns/${id}/tasks`,
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
    let foundData: IBoard;
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
        this.setConfig({ method: 'DELETE', body: id })
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
        this.setConfig({ method: 'DELETE', body: values.columnId })
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
          body: values,
        })
      );
      newBoard = await response.json();
      console.log(newBoard);
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
      console.log(newColumn);
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
    let newColumn: ITask;
    try {
      const response = await fetch(
        `${this.baseUrl}/boards/${values.id}/columns`,
        this.setConfig({
          method: 'POST',
          body: { title: values.title },
        })
      );
      newColumn = await response.json();
      console.log(newColumn);
      if (response.ok) {
        return newColumn;
      }

      throw response.body;
    } catch (e) {
      const err = e as Error;
      return Promise.reject(err.message ? err.message : err);
    }
  }
}

export const api = new Api(API_URL);

export const useToken = () => {
  const authToken = AuthToken;

  api.setToken(authToken);
};
