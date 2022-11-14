import React from 'react';
import { useState } from 'react';
import { IBoard } from 'types';
import { Link } from 'react-router-dom';
import ModalConfirmation from 'components/ModalConfirmation';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as TaskBoard } from '../../assets/icons/task-board.svg';
import './styles.css';

const BoardItem = (props: IBoard) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);
  const deleteBoard = async () => {
    console.log('delete board');
  };
  const editBoard = () => {
    console.log('edit board');
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };
  return (
    <>
      <div>
        <div className="board">
          <Link to={`/board/${id}`} key={id}>
            <div>{title}</div>
            <div>{description}</div>
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleModalQuestion();
            }}
          >
            delete board
          </button>
        </div>
        {/* <div>{title}</div>
        <div>{description}</div> */}
        <div className="board_item">
          <TaskBoard className="task-board" />
          <div className="info">
            <div className="change_board">
              <Link className="edit_link" to="/board/:id/edit">
                <Edit className="edit_board" onClick={editBoard} />
              </Link>
              <Delete className="delete_board" onClick={deleteBoard} />
            </div>
            <Link className="board_link" to="/board/:id">
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
      </div>
    </>
  );
};

export default BoardItem;
