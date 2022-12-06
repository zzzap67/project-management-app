import { t } from 'i18next';
import { ChangeEvent, useCallback, useState } from 'react';

const initValues = { name: '', login: '', password: '' };

export function useFormWithValidation() {
  const [values, setValues] = useState<Record<string, string>>(initValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);
  const nameRegExp = /[^a-z\- а-яё]/gi;
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value, validationMessage = t('description.message.validationMessage') } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid((target.closest('form') as HTMLFormElement).checkValidity());
    if (name === 'name' && nameRegExp.test(value) && !validationMessage) {
      setErrors({
        ...errors,
        [name]: t(`description.message.nameError`),
      });
    }
    if (name === 'email' && !emailRegExp.test(value) && !validationMessage) {
      setErrors({
        ...errors,
        [name]: t(`description.message.emailError`),
      });
    }
    if (name === 'password' && value.length < 5 && !validationMessage) {
      setErrors({
        ...errors,
        [name]: t(`description.message.passwordError`),
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
