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

  setConfig(method?: string, headers?: Headers, body?: Body): RequestInit {
    const config: RequestInit = {
      method: method ? method : 'GET',
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

  async getAllBoards() {
    let foundData: IBoard[] = [];
    try {
      const response = await fetch(`${this.baseUrl}/boards`, this.setConfig());
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
  async getAllColumns() {
    let foundData: IColumn[] = [];
    try {
      const response = await fetch(`${this.baseUrl}/columns`, this.setConfig());
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
  async getAllTasks() {
    let foundData: ITask[] = [];
    try {
      const response = await fetch(`${this.baseUrl}/tasks`, this.setConfig());
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
      const response = await fetch(`${this.baseUrl}/boards/${id}`, this.setConfig());
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
  async getColumnId(id: string) {
    let foundData: IColumn;
    try {
      const response = await fetch(`${this.baseUrl}/columns/${id}`, this.setConfig());
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
      const response = await fetch(`${this.baseUrl}/tasks/${id}`, this.setConfig());
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

export const useToken = () => {
  // TODO
  // const { authToken } = useAppSelector((state) => state.mainReducer);
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(getAuthToken);
  // }, [dispatch]);

  const authToken = AuthToken;

  api.setToken(authToken);
};
