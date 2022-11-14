import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IBoard } from 'types';
import ModalConfirmation from 'components/ModalConfirmation';
import './styles.css';

const BoardItem = (props: IBoard) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);

  const deleteBoard = async () => {
    console.log('delete board');
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };

  return (
    <>
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
      {showModal && (
        <ModalConfirmation
          confirmQuestion={<span>Do You Really Want To Delete {title}?</span>}
          setShowModal={setShowModal}
          onConfirm={deleteBoard}
        />
      )}
    </>
  );
};

export default BoardItem;
