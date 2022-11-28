import ModalConfirmation from 'components/ModalConfirmation';
import TaskList from 'components/TaskList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import React from 'react';
import { useState, createRef, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { deleteColumnThunk, editColumnThunk, createNewTaskThunk } from 'store/thunks';
import { IColumn, IEditColumn } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import ModalAction from 'components/ModalAction';
import { EItemType, ELocalStorage } from 'types';
import './styles.css';

const ColumnItem = (props: IColumn) => {
  // const ColumnItem = React.forwardRef((props: IColumn, ref) => {
  const { id, title, order } = props;
  const [showModal, setShowModal] = useState(false);
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const boardId = params.id;

  const [showModalActionTask, setShowModalActionTask] = useState(false);

  const handleModalActionTask = () => {
    setShowModalActionTask(true);
  };

  const createTask = async (values: Record<string, string>) => {
    const uID = localStorage.getItem(ELocalStorage.userId);
    if (boardId && uID) {
      await dispatch(
        createNewTaskThunk({
          title: values.title,
          description: values.description,
          columnId: id,
          boardId,
          userId: uID,
        })
      );
    }
    setShowModalActionTask(false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const submitChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    if (boardId) {
      const newColumn: IEditColumn = { title: newTitle, id, boardId, order };
      await dispatch(editColumnThunk(newColumn));
    }
    setShowTitleEditor(false);
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };
  const deleteColumn = async () => {
    if (boardId) {
      dispatch(deleteColumnThunk({ columnId: id, boardId }));
    }
  };
  return (
    <div className="column_item">
      <div className="column_info">
        {showTitleEditor ? (
          <>
            <form onSubmit={submitChange}>
              <input
                className="column_title"
                value={newTitle}
                placeholder={t('description.forms.enterTitle')}
                onChange={handleTitleChange}
              />
              <button className="titleButton confirmTitle" type="submit">
                &#10003;
              </button>
              <button
                className="titleButton cancelTitle"
                type="button"
                onClick={() => setShowTitleEditor(false)}
              >
                &#10005;
              </button>
            </form>
          </>
        ) : (
          <h2
            className="column_title"
            onClick={() => {
              setNewTitle(title);
              setShowTitleEditor(true);
            }}
          >
            {title}
          </h2>
        )}
        <Delete
          className="delete_board"
          onClick={(e) => {
            e.stopPropagation();
            handleModalQuestion();
          }}
        />
      </div>
      <div className="task_list">
        <TaskList columnId={id} />
      </div>
      <Button
        className="create_task__button"
        buttonName={t('description.forms.createTask')}
        eventHandler={() => handleModalActionTask()}
      />
      {showModal && (
        <ModalConfirmation
          confirmQuestion={<span>{`${t('description.forms.deleteQuestion')} ${title}?`}</span>}
          setShowModal={setShowModal}
          onConfirm={deleteColumn}
        />
      )}
      {showModalActionTask && (
        <ModalAction
          id=""
          title=""
          description=""
          formType={EItemType.createTask}
          isReadOnly={false}
          isDescriptionNeeded={true}
          setShowModalAction={setShowModalActionTask}
          onSubmit={createTask}
        />
      )}
    </div>
  );
};
export default ColumnItem;
