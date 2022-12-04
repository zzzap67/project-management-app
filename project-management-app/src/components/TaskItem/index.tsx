import ModalConfirmation from 'components/ModalConfirmation';
import ModalEdit from 'components/ModalEdit';
import { t } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { deleteTaskThunk, updateTaskThunk } from 'store/thunks';
import { EItemType, ELocalStorage, ITask } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import './styles.css';

const TaskItem = React.forwardRef((props: ITask, ref) => {
  const { id, title, description, order } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id;

  const deleteTask = async () => {
    await dispatch(
      deleteTaskThunk({
        columnId: props.columnId as string,
        taskId: id,
        boardId: boardId as string,
      })
    );
    navigate(`/board/${boardId}`);
  };

  const editTask = async (newTitle: string, newDescription: string) => {
    const uID = localStorage.getItem(ELocalStorage.userId);
    await dispatch(
      updateTaskThunk({
        id,
        order,
        userId: uID as string,
        boardId: boardId as string,
        columnId: props.columnId as string,
        title: newTitle,
        description: newDescription,
      })
    );
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };

  const handleModalEdit = () => {
    setShowModalEdit(true);
  };
  return (
    <div className="task_item">
      <div className="task_info">
        <h2 className="task_title">{title}</h2>
        <Edit
          className="edit_task"
          onClick={(e) => {
            e.stopPropagation();
            handleModalEdit();
          }}
        />
        <Delete
          className="delete_task"
          onClick={(e) => {
            e.stopPropagation();
            handleModalQuestion();
          }}
        />
      </div>
      {showModal && (
        <ModalConfirmation
          confirmQuestion={<span>{`${t('description.forms.deleteQuestion')} ${title}?`}</span>}
          setShowModal={setShowModal}
          onConfirm={deleteTask}
        />
      )}
      {showModalEdit && (
        <ModalEdit
          ref={ref}
          title={`${title}`}
          description={`${description}`}
          itemType={EItemType.task}
          isReadOnly={false}
          isDescriptionNeeded={true}
          setShowModalEdit={setShowModalEdit}
          onConfirm={editTask}
        />
      )}
    </div>
  );
});
export default TaskItem;
