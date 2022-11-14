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

export { MainState, IBoard, IColumn, ITask, ITooltip, ETooltipType };
