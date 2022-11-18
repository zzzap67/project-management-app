interface MainState {
  isLoading: boolean;
  boards: Record<IBoard['id'], IBoard>;
  columns: Record<IColumn['id'], IColumn>;
  tasks: Record<ITask['id'], ITask>;
  board: IBoard | null;
  column: IColumn | null;
  task: ITask | null;
  error: string | null;
}

interface IBoard {
  id: string;
  title: string;
  description: string;
  key: string;
}
interface IColumn {
  id: string;
  title: string;
  description: string;
  key: string;
}
interface ITask {
  id: string;
  title: string;
  description: string;
  key: string;
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

interface ISignIn {
  token: string;
}

enum EApiMethods {
  get = 'GET',
  post = 'POST',
  delete = 'DELETE',
}

interface IApiConfig {
  method?: EApiMethods;
  headers?: Headers;
  body?: Partial<ICreateUser>;
}

enum ELocalStorage {
  token = 'token',
  userId = 'userId',
}

export {
  MainState,
  IBoard,
  IColumn,
  ITask,
  ITooltip,
  ETooltipType,
  IUserState,
  EApiMethods,
  ICreateUser,
  IApiConfig,
  IUser,
  ISignIn,
  ELocalStorage,
};
