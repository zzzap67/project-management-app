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

export { MainState, IBoard, ITooltip, ETooltipType };
