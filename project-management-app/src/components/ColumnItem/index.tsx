import ModalConfirmation from 'components/ModalConfirmation';
import TaskList from 'components/TaskList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useState } from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { deleteColumnThunk } from 'store/thunks';
import { IColumn } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import './styles.css';

const ColumnItem = (props: IColumn) => {
  const { id, title } = props;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const boardId = params.id;
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
        <h2 className="column_title">{title}</h2>
        <Delete
          className="delete_board"
          onClick={(e) => {
            e.stopPropagation();
            handleModalQuestion();
          }}
        />
      </div>
      {/* <div className="task_list"> */}
      <Droppable droppableId={`column/${id}`} type="TASK">
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskList columnId={id} {...props} />
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {/* </div> */}
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
