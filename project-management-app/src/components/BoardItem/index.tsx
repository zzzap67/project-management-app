import { useState } from 'react';
import { EItemType, IBoard } from 'types';
import { Link } from 'react-router-dom';
import ModalConfirmation from 'components/ModalConfirmation';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as TaskBoard } from '../../assets/icons/task-board.svg';
import { deleteBoardThunk, editBoardThunk } from '../../store/thunks';
import { useAppDispatch } from '../../store/hooks';
import { t } from 'i18next';
import ModalEdit from 'components/ModalEdit';
import './styles.css';

const BoardItem = (props: IBoard) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const dispatch = useAppDispatch();
  const deleteBoard = async () => {
    dispatch(deleteBoardThunk(id));
  };

  const editBoard = async (newTitle: string, newDescription: string) => {
    await dispatch(editBoardThunk({ id, title: newTitle, description: newDescription }));
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };

  const handleModalEdit = () => {
    setShowModalEdit(true);
  };

  return (
    <>
      <div className="board_item">
        <TaskBoard className="task-board" />
        <div className="info">
          <div className="change_board">
            <Edit
              className="edit_board"
              onClick={(e) => {
                e.stopPropagation();
                handleModalEdit();
              }}
            />
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
              confirmQuestion={<span>{`${t('description.forms.deleteQuestion')} ${title}?`}</span>}
              setShowModal={setShowModal}
              onConfirm={deleteBoard}
            />
          )}
          {showModalEdit && (
            <ModalEdit
              title={`${title}`}
              description={`${description}`}
              itemType={EItemType.board}
              isReadOnly={false}
              isDescriptionNeeded={true}
              setShowModalEdit={setShowModalEdit}
              onConfirm={editBoard}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BoardItem;
