import { FormProps } from 'components/Form';
import Input, { InputProps } from 'components/Input';
import { SyntheticEvent } from 'react';
import { useFormWithValidation } from 'utils';
import './style.css';

const CreateBoardForm = ({ formData, errorMessage, className, onSubmit }: FormProps) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { inputsBoardData, title, buttonBoardText, text, linkText, linkTo } = formData;
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
      <div className="board__inputs-wrapper">{renderInputs(inputsBoardData)}</div>
      <button className="board__button button" type="submit" disabled={!isValid}>
        {buttonBoardText}
      </button>
    </form>
  );
};
export default CreateBoardForm;
