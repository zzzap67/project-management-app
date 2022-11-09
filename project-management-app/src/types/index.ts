interface MainState {
  isLoading: boolean;
  boardsList: IBoard[];
};

interface IBoard {
  id: string;
  title: string;
  description: string;
}

interface IBoardsList {
  data: IBoard[];
};

export { MainState, IBoard, IBoardsList };
