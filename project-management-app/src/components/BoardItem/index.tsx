import { IBoard } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as TaskBoard } from '../../assets/icons/task-board.svg';
import './styles.css';

const BoardItem = (props: IBoard) => {
  const { id, title, description } = props;
  const deleteBoard = () => {
    console.log('delete board');
  };
  const editBoard = () => {
    console.log('edit board');
  };
  return (
    <div className="board_item">
      <div className="change_board">
        <Edit className="edit_board" onClick={deleteBoard} />
        <Delete className="delete_board" onClick={editBoard} />
      </div>
      <div className="board_info">
        <TaskBoard className="task-board" />
        <div className="info">
          <p className="info_title">{title}</p>
          <p className="info_description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
