import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import './styles.css';

const EditBoardForm = () => {
  const registerData = ru.BOARD_EDIT_FORM;
  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_board'} onSubmit={onSubmit} />
  );
};
export default EditBoardForm;
