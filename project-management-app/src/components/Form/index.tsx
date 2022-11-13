import { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import Input, { InputData } from '../Input/';
import { useFormWithValidation } from '../../utils';
import { ru } from '../locales/ru';
import { useTranslation } from 'react-i18next';
import './styles.css';

export interface FormProps {
  formData: typeof ru.REGISTER_FORM;
  errorMessage: string;
  className: string;
  onSubmit: (values: Record<string, string>) => void;
}

const Form = ({ formData, errorMessage, className, onSubmit }: FormProps) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { inputsData, title, buttonText, text, linkText, linkTo } = formData;
  const { t } = useTranslation('translation');

  const renderInputs = (inputs: InputData[]) => {
    return inputs.map((input) => (
      <Input inputData={input} key={input.id} onChange={handleChange} errors={errors} />
    ));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit}>
      <h2 className="form__title">{t('description.forms.title')}</h2>
      <div className="form__inputs-wrapper">{renderInputs(inputsData)}</div>
      <div
        className={`form__button-wrapper 
        ${
          inputsData.length === 3
            ? 'form__button-wrapper_type_near'
            : 'form__button-wrapper_type_far'
        }`}
      >
        {errorMessage && <p className="form__error">{errorMessage}</p>}
        <button className="form__button button" type="submit" disabled={!isValid}>
          {t('description.forms.buttonText')}
        </button>
        <p className="form__text">
          {t('description.forms.text')}
          <NavLink to={linkTo} className="form__link link">
            {t('description.forms.linkText')}
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default Form;
