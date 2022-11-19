import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { createNewTaskThunk } from 'store/thunks';

import './styles.css';

const CreateNewTaskForm = () => {
  const registerData = ru.TASK_FORM;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const boardId = (path: string) => {
    return path.split('/').slice(2, 3).join();
  };
  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });
    if (id) {
      console.log(values);
      dispatch(
        createNewTaskThunk({
          title: values.title,
          description: values.description,
          columnId: id,
          boardId: boardId(location.pathname),
          // userId,
        })
      );
      navigate(`/board/${boardId(location.pathname)}`);
    }
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_task'} onSubmit={onSubmit} />
  );
};
export default CreateNewTaskForm;
