import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.css';

export interface InputData {
  id: string;
  label: string;
  type: string;
}
export interface InputProps {
  inputData: InputData;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const Input = ({ inputData, onChange, errors }: InputProps) => {
  const { id, label, type } = inputData;
  const { t } = useTranslation('translation');

  // const translationErrors = (id: string) => {
  //   switch (id) {
  //     case 'name':
  //       const translateNameError = t(`description.message.nameError`);
  //       return translateNameError;
  //     case 'email':
  //       const translateEmailError = t(`description.message.emailError`);
  //       return translateEmailError;
  //     // case :
  //     //   const translateError = t(`description.message.validationMessage`);
  //     //   return translateError;
  //   }
  // };

  return (
    <div className="input">
      <label htmlFor={id} className={`input__labeаl  ${id}_input__label`}>
        {t(`description.forms.inputs.${id}Label`)}
      </label>
      <input
        className={`input__field  ${id}_input`}
        required
        type={type}
        id={id}
        name={id}
        placeholder={t(`description.forms.inputs.${id}Label`)}
        onChange={onChange}
      />
      {/* {errors[id] && <p className="input__error">{errors[id]}</p>} */}

      {errors[id] && (
        <p className="input__error">
          {id === 'name' || id === 'email' ? t(`description.message.${id}Error`) : null}
        </p>
      )}
    </div>
  );
};

export default Input;
