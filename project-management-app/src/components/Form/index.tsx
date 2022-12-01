import { SyntheticEvent } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Input from '../Input/';
import { FormProps, InputData } from 'types';
import { useFormWithValidation } from '../../utils';
import { useTranslation } from 'react-i18next';
import './styles.css';

export interface formBoardData {
  inputsData: InputData[];
  title: string;
}

export interface formRegisterData {
  inputsData: InputData[];
  linkTo: string;
  title: string;
  buttonText: string;
  text: string;
  linkText: string;
}

const Form = ({ formData, errorMessage, className, onSubmit, onCancel }: FormProps) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { inputsData, linkTo, title, buttonText, text, linkText } = formData;
  const { t } = useTranslation('translation');
  const params = useParams();
  const boardId = params.id;
  const navigate = useNavigate();

  const renderInputs = (inputs: InputData[]) => {
    return inputs.map((input) => (
      <Input inputData={input} key={input.id} onChange={handleChange} errors={errors} />
    ));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const closeModal = (e: SyntheticEvent) => {
    e.preventDefault();
    onCancel?.(false);
  };

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit}>
      {className === 'update_column' ? null : (
        <h2 className={`form__title ${className}__title `}>{t(`description.forms.${title}`)!}</h2>
      )}

      <div className={`form__inputs-wrapper ${className}__inputs-wrapper`}>
        {renderInputs(inputsData)}
      </div>

      {errorMessage && <p className="form__error">{errorMessage}</p>}
      {(className.includes('register') ||
        className.includes('login') ||
        className.includes('user-profile')) && (
        <>
          <div
            className={`form__button-wrapper
        ${
          inputsData.length === 3
            ? 'form__button-wrapper_type_near'
            : 'form__button-wrapper_type_far'
        }`}
          ></div>
          <button
            className="form__button button"
            type="submit"
            disabled={!isValid || !Object.values(errors).every((error) => error === '')}
          >
            {t(`description.forms.${buttonText}`)}
          </button>
          {!className.includes('user-profile') && (
            <p className="form__text">
              {t(`description.forms.${text}`)}
              <NavLink to={linkTo} className="form__link link">
                {t(`description.forms.${linkText}`)}
              </NavLink>
            </p>
          )}
        </>
      )}
      {className === 'form_board' ||
      className === 'form_task' ||
      className === 'form_column' ||
      className === 'update_column' ||
      className === 'form_edit__task' ? (
        <>
          <button className="confirm__button button" type="submit" disabled={!isValid}>
            {t('description.forms.confirmButtonText')}
          </button>
          <button
            className="cancel__button button"
            onClick={
              onCancel
                ? closeModal
                : () => {
                    className === 'form_column' ||
                    className === 'form_task' ||
                    className === 'update_column'
                      ? navigate(`${linkTo}${boardId}`)
                      : navigate(linkTo);
                    navigate(linkTo);
                  }
            }
          >
            {t('description.forms.cancelButtonText')}
          </button>
        </>
      ) : null}
    </form>
  );
};

export default Form;
