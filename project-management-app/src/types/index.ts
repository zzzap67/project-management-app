interface MainState {
  isLoading: boolean;
  boards: Record<IBoard['id'], IBoard>;
  columns: Record<IColumn['id'], IColumn>;
  board: IBoard | null;
  column: IColumn | null;
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

interface ITooltip {
  message: string;
  type: ETooltipType | undefined;
}

enum ETooltipType {
  ok = 'ok',
  error = 'error',
}

export { MainState, IBoard, IColumn, ITooltip, ETooltipType };
