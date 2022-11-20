import ModalConfirmation from 'components/ModalConfirmation';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { deleteTaskThunk } from 'store/thunks';
import { ITask } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import './styles.css';

const TaskItem = (props: ITask) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id;
  const deleteTask = async () => {
    if (props.columnId && boardId) {
      await dispatch(deleteTaskThunk({ columnId: props.columnId, taskId: id, boardId }));
    }
    navigate(`/board/${boardId}`);
  };

  const handleModalQuestion = () => {
    setShowModal(true);
  };
  return (
    <div className="task_item">
      <div className="task_info">
        <h2 className="task_title">{title}</h2>
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
          confirmQuestion={<span>Do You Really Want To Delete {title}?</span>}
          setShowModal={setShowModal}
          onConfirm={deleteTask}
        />
      )}
    </div>
  );
};
export default TaskItem;
