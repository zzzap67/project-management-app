interface MainState {
  isLoading: boolean;
  boards: BoardsRecord;
  columns: ColumnsRecord;
  tasks: TasksRecord;
  board: IBoard | null;
  column: IColumn | null;
  task: ITask | null;
  error: string | null;
  userId: string | null;
}
type ColumnsRecord = Record<IColumn['id'], IColumn>;
type BoardsRecord = Record<IBoard['id'], IBoard>;
type TasksRecord = Record<IColumn['id'], TaskRecord>;
type TaskRecord = Record<ITask['id'], ITask>;

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
  tasks: ITask[];
}
interface ITask {
  userId?: string;
  columnId?: string;
  id: string;
  title: string;
  description: string;
  key: string;
}

interface PropsTask {
  columnId: string;
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
  PropsTask,
  BoardsRecord,
  ColumnsRecord,
  TasksRecord,
  TaskRecord,
};
