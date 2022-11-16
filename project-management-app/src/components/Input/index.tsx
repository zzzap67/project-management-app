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
  const { id, type } = inputData;
  const { t } = useTranslation('translation');

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
        placeholder={t(`description.forms.inputs.${id}Placeholder`)}
        onChange={onChange}
      />
      {errors[id] && (
        <p className="input__error">
          {id === 'name' || id === 'email' || id === 'password'
            ? t(`description.message.${id}Error`)
            : errors[id]}
        </p>
      )}
    </div>
  );
};

export default Input;
