import { API_URL, AuthToken } from 'const';
import { EApiMethods, IApiConfig, IBoard, ICreateUser, IUser } from 'types';

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

  async postSignUp(body: ICreateUser) {
    let foundData: IUser | null = null;
    try {
      const response = await fetch(
        `${this.baseUrl}/signup`,
        this.setConfig({ method: EApiMethods.post, body })
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
