import { FormProps } from 'components/Form';
import Input, { InputProps } from 'components/Input';
import { SyntheticEvent } from 'react';
import { useFormWithValidation } from 'utils';
import './style.css';

const CreateNewBoardComponentForm = ({
  formData,
  errorMessage,
  className,
  onSubmit,
}: FormProps) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const { inputsBoardData, buttonBoardText, cancelButtonText } = formData;
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
      {errorMessage && <p className="form__error">{errorMessage}</p>}
      <button className="confirm__button button" type="submit" disabled={!isValid}>
        {buttonBoardText}
      </button>
      <button className="cancel__button button">{cancelButtonText}</button>
    </form>
  );
};
export default CreateNewBoardComponentForm;
