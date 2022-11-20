import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createNewTaskThunk } from 'store/thunks';

import './styles.css';

const CreateNewTaskForm = () => {
  const registerData = ru.TASK_FORM;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId, columnId } = useParams();
  const user = useAppSelector((state) => state.userReducer);
  const onSubmit = async (values: Record<string, string>) => {
    if (boardId && columnId) {
      await dispatch(
        createNewTaskThunk({
          title: values.title,
          description: values.description,
          columnId,
          boardId,
          userId: user.id,
        })
      );
      navigate(`/board/${boardId}`);
    }
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_task'} onSubmit={onSubmit} />
  );
};
export default CreateNewTaskForm;
