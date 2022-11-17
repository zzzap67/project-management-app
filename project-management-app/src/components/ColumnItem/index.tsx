import ModalConfirmation from 'components/ModalConfirmation';
import TaskList from 'components/TaskList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { getAllColumnsThunk, getAllTasksThunk } from 'store/thunks';
import { IColumn } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import './styles.css';

const ColumnItem = (props: IColumn) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  console.log(params);
  const boardId = params.id;

  useEffect(() => {
    if (id) {
      dispatch(getAllTasksThunk(id as string));
    }
  }, [dispatch, id]);

  const handleModalQuestion = () => {
    setShowModal(true);
  };
  const deleteColumn = async () => {
    console.log('delete column');
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
      <div className="task_list">
        <TaskList />
      </div>
      <Button
        className="create_task__button"
        buttonName={t('description.forms.createTask')}
        eventHandler={() => navigate(`/board/${boardId}/task`)}
      />
      {showModal && (
        <ModalConfirmation
          confirmQuestion={<span>Do You Really Want To Delete {title}?</span>}
          setShowModal={setShowModal}
          onConfirm={deleteColumn}
        />
      )}
    </div>
  );
};
export default ColumnItem;
