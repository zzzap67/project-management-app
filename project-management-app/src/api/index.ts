import { API_URL } from 'const';
import {
  EApiMethods,
  IApiConfig,
  IBoard,
  IColumn,
  ICreateUser,
  ISignIn,
  ITask,
  IUser,
} from 'types';

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

  setConfig({ method, headers, body }: IApiConfig): RequestInit {
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
        this.setConfig({ method: EApiMethods.delete })
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
}

export const api = new Api(API_URL);
