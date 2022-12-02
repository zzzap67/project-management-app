import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import logo from '../../assets/icons/logo.svg';
import { ru } from '../../components/locales/ru';
import { useAppDispatch } from '../../store/hooks';
import { signIn, signUp } from '../../store/thunks';
import { ELocalStorage } from '../../types';
import { api } from '../../api';
import './styles.css';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const registerData = ru.REGISTER_FORM;
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  if (isAuth) {
    navigate('/boards');
  }

  const onSubmit = async (values: Record<string, string>) => {
    const signUpRes = await dispatch(signUp(values));

    if (signUpRes.meta.requestStatus !== 'rejected') {
      const signInRes = await dispatch(
        signIn({
          login: values.login,
          password: values.password,
        })
      );
      const token = (signInRes.payload as Record<string, string>).token;

      if (token) {
        localStorage.setItem(ELocalStorage.token, token);
        localStorage.setItem(
          ELocalStorage.userId,
          (signInRes.payload as Record<string, string>).id
        );
        api.setToken(token);
      }
      navigate('/boards', { replace: true });
    }
  };

  return (
    <main className="register">
      <NavLink to="/" className="register__link">
        <img src={logo} alt="Логотип: зеленый кружок" className="register__logo" />
      </NavLink>
      <Form formData={registerData} className="register__form" onSubmit={onSubmit} />
    </main>
  );
};

export default Register;
