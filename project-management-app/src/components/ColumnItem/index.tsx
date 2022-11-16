import ModalConfirmation from 'components/ModalConfirmation';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IColumn } from 'types';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import './styles.css';

const ColumnItem = (props: IColumn) => {
  const { id, title, description } = props;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const deleteColumn = async () => {
    console.log('delete column');
  };

  const handleModalQuestion = () => {
    setShowModal(true);
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
      <div className="task_list"></div>
      <Button
        className="create_task__button"
        buttonName={t('description.forms.createTask')}
        eventHandler={() => navigate('/board/:id/task')}
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
