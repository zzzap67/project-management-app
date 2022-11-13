import { FormProps } from 'components/Form';
import Input, { InputProps } from 'components/Input';
import { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormWithValidation } from 'utils';
import './style.css';

const CreateNewBoardComponentForm = ({ formData, className, onSubmit }: FormProps) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { inputsBoardData } = formData;
  const { t } = useTranslation('translation');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(values);
  };
  const renderInputs = (inputs: InputProps['inputData'][]) => {
    return inputs.map((input) => (
      <Input inputData={input} key={input.id} onChange={handleChange} errors={errors} />
    ));
  };
  return (
    <form className={`form_${className}`} onSubmit={handleSubmit}>
      <div className={`${className}__inputs-wrapper`}>{renderInputs(inputsBoardData)}</div>
      <button className="confirm__button button" type="submit" disabled={!isValid}>
        {t('description.forms.confirmButtonText')}
      </button>
      <button className="cancel__button button">{t('description.forms.cancelButtonText')}</button>
    </form>
  );
};
export default CreateNewBoardComponentForm;
