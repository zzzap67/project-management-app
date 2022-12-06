import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { editBoardThunk } from 'store/thunks';
import './styles.css';

const EditBoardForm = () => {
  const registerData = ru.BOARD_EDIT_FORM;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();

  const onSubmit = async (values: Record<string, string>) => {
    if (boardId) {
      await dispatch(
        editBoardThunk({ boardId, title: values.title, description: values.description })
      );
    }
    navigate(`/boards`);
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_board'} onSubmit={onSubmit} />
  );
};
export default EditBoardForm;
