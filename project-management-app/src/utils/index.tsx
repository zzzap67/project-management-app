import { ChangeEvent, useCallback, useState } from 'react';
import { ru } from '../components/locales/ru';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const nameRegExp = /[^a-z\- а-яё]/gi;
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value, validationMessage } = target;

    setValues({ ...values, [name]: value });
    setIsValid((target.closest('form') as HTMLFormElement).checkValidity());
    setErrors({ ...errors, [name]: validationMessage });
    if (name === 'name' && nameRegExp.test(value) && !validationMessage) {
      setErrors({
        ...errors,
        [name]: ru.MESSAGE.NAME_ERR,
      });
    }
    if (name === 'email' && !emailRegExp.test(value) && !validationMessage) {
      setErrors({
        ...errors,
        [name]: ru.MESSAGE.EMAIL_ERR,
      });
      setIsValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
