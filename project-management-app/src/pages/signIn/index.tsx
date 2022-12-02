import React, { useEffect } from 'react';
import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import logo from '../../assets/icons/logo.svg';
import { ru } from '../../components/locales/ru';
import { useAppDispatch } from '../../store/hooks';
import { signIn } from '../../store/thunks';
import { ELocalStorage } from '../../types';
import { api } from '../../api';
import { useAuth } from '../../hooks/useAuth';

function SignIn() {
  const navigate = useNavigate();
  const formData = ru.LOGIN_FORM;
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate('/boards');
    }
  });
  const onSubmit = async (values: Record<string, string>) => {
    const signInRes = await dispatch(
      signIn({
        login: values.login,
        password: values.password,
      })
    );
    const token = (signInRes.payload as Record<string, string>).token;

    if (token) {
      api.setToken(token);
      localStorage.setItem(ELocalStorage.token, token);
      localStorage.setItem(ELocalStorage.userId, (signInRes.payload as Record<string, string>).id);
      navigate('/boards', { replace: true });
    }
  };

  return (
    <main className="login">
      <NavLink to="/" className="login__link">
        <img src={logo} alt="Логотип: зеленый кружок" className="login__logo" />
      </NavLink>
      <Form formData={formData} className="login__form" onSubmit={onSubmit} />
    </main>
  );
}

export default SignIn;
