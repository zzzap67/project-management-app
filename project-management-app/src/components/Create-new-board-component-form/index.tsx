import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { createNewBoardThunk } from 'store/thunks';
import './style.css';

const CreateNewBoardComponentForm = () => {
  const registerData = ru.BOARD_FORM;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (values: Record<string, string>) => {
    dispatch(createNewBoardThunk(values));
    navigate(`/boards`);
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_board'} onSubmit={onSubmit} />
  );
};
export default CreateNewBoardComponentForm;
