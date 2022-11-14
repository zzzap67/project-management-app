interface MainState {
  isLoading: boolean;
  boards: Record<IBoard['id'], IBoard>;
  board: IBoard | null;
  error: string | null;
}

interface IBoard {
  id: string;
  title: string;
  description: string;
}

interface ITooltip {
  message: string;
  type: ETooltipType | undefined;
}

enum ETooltipType {
  ok = 'ok',
  error = 'error',
}

interface IUser {
  id: string;
  name: string;
  login: string;
}

interface ICreateUser {
  name: string;
  login: string;
  password: string;
}

interface IUserState extends IUser {
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

enum EApiMethods {
  get = 'GET',
  post = 'POST',
}

interface IApiConfig {
  method?: EApiMethods;
  headers?: Headers;
  body?: ICreateUser;
}

enum ELocalStorage {
  token = 'token',
}

export {
  MainState,
  IBoard,
  ITooltip,
  ETooltipType,
  IUserState,
  EApiMethods,
  ICreateUser,
  IApiConfig,
  IUser,
};
