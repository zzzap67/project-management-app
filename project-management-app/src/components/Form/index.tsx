import { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import Input, { InputData } from '../Input/';
import { useFormWithValidation } from '../../utils';
import { ru } from '../locales/ru';
import { useTranslation } from 'react-i18next';
import './styles.css';

export interface FormProps {
  formData: typeof ru.REGISTER_FORM | typeof ru.BOARD_FORM;
  errorMessage: string;
  className: string;
  onSubmit: (values: Record<string, string>) => void;
}

const Form = ({ formData, errorMessage, className, onSubmit }: FormProps) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { inputsData, linkTo, title, buttonText, text, linkText } = formData;
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
      <h2 className={`form__title ${className}__title `}>{t(`description.forms.${title}`)!}</h2>
      <div className={`form__inputs-wrapper ${className}__inputs-wrapper`}>
        {renderInputs(inputsData)}
      </div>

      {errorMessage && <p className="form__error">{errorMessage}</p>}
      {className === 'register__form' ? (
        <>
          <div
            className={`form__button-wrapper 
        ${
          inputsData.length === 3
            ? 'form__button-wrapper_type_near'
            : 'form__button-wrapper_type_far'
        }`}
          ></div>
          <button className="form__button button" type="submit" disabled={!isValid}>
            {t(`description.forms.${buttonText}`)}
          </button>
          <p className="form__text">
            {t(`description.forms.${text}`)}
            <NavLink to={linkTo} className="form__link link">
              {t(`description.forms.${linkText}`)}
            </NavLink>
          </p>
        </>
      ) : null}
      {className === 'form_board' || className === 'form_task' ? (
        <>
          <button className="confirm__button button" type="submit" disabled={!isValid}>
            {t('description.forms.confirmButtonText')}
          </button>
          <button className="cancel__button button">
            {t('description.forms.cancelButtonText')}
          </button>
        </>
      ) : null}
      {/* <button className="form__button button" type="submit" disabled={!isValid}>
          {t(`description.forms.${buttonText}`)}
        </button>
        <p className="form__text">
          {t(`description.forms.${text}`)}
          <NavLink to={linkTo} className="form__link link">
            {t(`description.forms.${linkText}`)}
          </NavLink>
        </p> */}
      {/* </div> */}
    </form>
  );
};

export default Form;
