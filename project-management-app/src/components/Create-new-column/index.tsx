import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import './styles.css';

const CreateNewColumnForm = () => {
  const registerData = ru.COLUMN_FORM;
  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_column'} onSubmit={onSubmit} />
  );
};
export default CreateNewColumnForm;
