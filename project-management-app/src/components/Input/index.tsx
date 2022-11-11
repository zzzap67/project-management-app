import './styles.css';
import { ChangeEvent } from 'react';

export interface InputProps {
  inputData: {
    id: string;
    label: string;
    type: string;
  };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const Input = ({ inputData, onChange, errors }: InputProps) => {
  const { id, label, type } = inputData;

  return (
    <div className="input">
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <input
        className="input__field"
        required
        type={type}
        id={id}
        name={id}
        placeholder={`Введите ${label.toLowerCase()}`}
        onChange={onChange}
      />
      {errors[id] && <p className="input__error">{errors[id]}</p>}
    </div>
  );
};

export default Input;
