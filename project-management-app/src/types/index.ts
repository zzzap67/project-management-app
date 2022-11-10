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

export { MainState, IBoard };
