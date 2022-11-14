import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import './styles.css';

const CreateNewTaskForm = () => {
  const registerData = ru.TASK_FORM;
  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });
  };

  return (
    <Form formData={registerData} errorMessage={''} className={'form_task'} onSubmit={onSubmit} />
  );
};
export default CreateNewTaskForm;
