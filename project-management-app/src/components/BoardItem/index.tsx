import { useState } from 'react';
import { IBoard } from 'types';
import { Link } from 'react-router-dom';
import ModalConfirmation from 'components/ModalConfirmation';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as TaskBoard } from '../../assets/icons/task-board.svg';
import { deleteBoardThunk } from '../../store/thunks';
import { useAppDispatch } from '../../store/hooks';
import './styles.css';

const BoardItem = (props: IBoard) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const deleteBoard = async () => {
    dispatch(deleteBoardThunk(id));
  };
  const editBoard = () => {
    console.log('edit board');
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="board_item">
        <TaskBoard className="task-board" />
        <div className="info">
          <div className="change_board">
            <Link className="edit_link" to="/board/:id/edit">
              <Edit className="edit_board" onClick={editBoard} />
            </Link>
            <Delete
              className="delete_board"
              onClick={(e) => {
                e.stopPropagation();
                handleModalQuestion();
              }}
            />
          </div>
          <Link className="board_link" to={`/board/${id}`} key={id}>
            <p className="info_title">{title}</p>
            <p className="info_description">{description}</p>
          </Link>
          {showModal && (
            <ModalConfirmation
              confirmQuestion={<span>Do You Really Want To Delete {title}?</span>}
              setShowModal={setShowModal}
              onConfirm={deleteBoard}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BoardItem;
