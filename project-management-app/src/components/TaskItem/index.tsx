import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import ModalConfirmation from 'components/ModalConfirmation';
import { t } from 'i18next';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteTaskThunk, updateTaskThunk } from 'store/thunks';
import { ITask } from 'types';
import { useFormWithValidation } from 'utils';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import './styles.css';

const TaskItem = React.forwardRef((props: ITask, ref) => {
  const { id, title, description, order } = props;
  const user = useAppSelector((state) => state.userReducer);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id;
  const [showModalAction, setShowModalAction] = useState(false);

  const onSubmit = async (values: Record<string, string>) => {
    console.log(values);
    if (boardId && props.columnId) {
      await dispatch(
        updateTaskThunk({
          boardId,
          columnId: props.columnId,
          taskId: id,
          userId: user.id,
          title: values.title ? values.title : title,
          description: values.description ? values.description : description,
          order,
        })
      );
    }
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(values);
    closeModal();
  };
  const closeModal = () => {
    setShowModalAction(false);
    navigate(`/board/${boardId}`);
  };
  const handleModalAction = () => {
    setShowModalAction(true);
  };
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

  const handleModalQuestion = () => {
    setShowModal(true);
  };
  return (
    <div className="task_item">
      <div className="task_info">
        <h2 className="task_title" onClick={handleModalAction}>
          {title}
        </h2>
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
      {showModalAction
        ? createPortal(
            <div className="modalAction task_info__modal">
              <div className="modalActionContent  modal_task__content">
                <form className="edit_task__form" onSubmit={handleSubmit}>
                  <label htmlFor={title} className={`input__label  title_input__label`}>
                    {t(`description.forms.inputs.titleLabel`)}
                  </label>
                  <input
                    className={`input__field  title_input`}
                    type="text"
                    id="title"
                    name="title"
                    placeholder={title}
                    onChange={handleChange}
                  ></input>
                  <label htmlFor={description} className={`input__label  description_input__label`}>
                    {t(`description.forms.inputs.descriptionLabel`)}
                  </label>
                  <input
                    className={`input__field  description_input`}
                    type="text"
                    id="description"
                    name="description"
                    placeholder={description}
                    onChange={handleChange}
                  />
                  <button
                    className="confirm__button button"
                    type="submit"
                    disabled={!isValid}
                    onClick={() => navigate(`/board/${boardId}`)}
                  >
                    {t('description.forms.confirmButtonText')}
                  </button>
                  <button className="cancel__button button" onClick={closeModal}>
                    {t('description.forms.cancelButtonText')}
                  </button>
                </form>
              </div>
            </div>,
            document.getElementById('modal') as Element
          )
        : null}
    </div>
  );
});
export default TaskItem;
