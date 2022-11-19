import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { createNewColumnThunk } from 'store/thunks';
import './styles.css';

const CreateNewColumnForm = () => {
  const registerData = ru.COLUMN_FORM;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const onSubmit = async (values: Record<string, string>) => {
    if (id) {
      dispatch(createNewColumnThunk({ title: values.title, id }));
      navigate(`/board/${id}`);
    }
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_column'} onSubmit={onSubmit} />
  );
};
export default CreateNewColumnForm;
