import { ChangeEvent, useCallback, useState } from 'react';
import { ru } from '../components/locales/ru';
import { ICreateUser } from '../types';

const initValues = { name: '', login: '', password: '' };

export function useFormWithValidation() {
  const [values, setValues] = useState<ICreateUser>(initValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const nameRegExp = /[^a-z\- а-яё]/gi;
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value, validationMessage } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid((target.closest('form') as HTMLFormElement).checkValidity());
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
    }
    if (name === 'password' && value.length < 5 && !validationMessage) {
      setErrors({
        ...errors,
        [name]: ru.MESSAGE.PASSWORD_ERR,
      });
    }
  };

  const resetForm = useCallback(
    (newValues = initValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
