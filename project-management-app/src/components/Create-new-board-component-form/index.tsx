import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useAppDispatch } from 'store/hooks';
import { createNewBoardThunk } from 'store/thunks';
import './style.css';

const CreateNewBoardComponentForm = () => {
  const registerData = ru.BOARD_FORM;
  const dispatch = useAppDispatch();
  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });
    dispatch(createNewBoardThunk(values));
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_board'} onSubmit={onSubmit} />
  );
};
export default CreateNewBoardComponentForm;
