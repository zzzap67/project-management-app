import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import ModalConfirmation from 'components/ModalConfirmation';
import TaskList from 'components/TaskList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumnThunk, updateColumnThunk } from 'store/thunks';
import { IColumn } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import './styles.css';
import { ru } from 'components/locales/ru';
import Form from 'components/Form';

const ColumnItem = (props: IColumn) => {
  const { id, title, order } = props;
  const user = useAppSelector((state) => state.userReducer);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const boardId = params.id;
  const registerData = ru.COLUMN_EDIT_FORM;
  const [showEditForm, setShowEditForm] = useState(false);
  const handleShowInput = () => {
    setShowEditForm(true);
  };
  const handleModalQuestion = () => {
    setShowModal(true);
  };
  const deleteColumn = async () => {
    if (boardId) {
      dispatch(deleteColumnThunk({ columnId: id, boardId }));
    }
  };
  const onSubmit = async (values: Record<string, string>) => {
    if (boardId) {
      await dispatch(
        updateColumnThunk({
          boardId,
          columnId: id,
          title: values.title,
          userId: user.id,
          order: order,
        })
      );
    }
    setShowEditForm(false);
  };
  return (
    <div className="column_item">
      <div className="column_info">
        <div className="column_title__wrapper">
          <h2 className="column_title" onClick={handleShowInput}>
            {title}
          </h2>
          {showEditForm ? (
            <Form
              formData={registerData}
              errorMessage={''}
              className={`update_column`}
              onSubmit={onSubmit}
            />
          ) : null}
        </div>
        <Delete
          className="delete_board"
          onClick={(e) => {
            e.stopPropagation();
            handleModalQuestion();
          }}
        />
      </div>
      <Droppable droppableId={`column/${id}`} type="TASK" direction="vertical">
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskList columnId={id} {...props} />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <Button
        className="create_task__button"
        buttonName={t('description.forms.createTask')}
        eventHandler={() => navigate(`/board/${boardId}/column/${id}/task`)}
      />
      {showModal && (
        <ModalConfirmation
          confirmQuestion={<span>{`${t('description.forms.deleteQuestion')} ${title}?`}</span>}
          setShowModal={setShowModal}
          onConfirm={deleteColumn}
        />
      )}
    </div>
  );
};
export default ColumnItem;
