import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import logo from '../../assets/icons/logo.svg';
import { ru } from '../../components/locales/ru';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signUp } from '../../store/thunks';
import { ICreateUser } from '../../types';

const Register = () => {
  const navigate = useNavigate();
  const registerData = ru.REGISTER_FORM;
  const error = useAppSelector((state) => state.userReducer.error);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: ICreateUser) => {
    console.log(values);
    await dispatch(signUp(values));
    if (!error) {
      navigate('/signin', { replace: true });
    } else {
      console.log('error', error);
    }
    // try {
    //   const { email, name, password } = values;
    //   await mainApi.signUp(values);
    //   const { token } = await mainApi.signIn({ email, password });
    //   localStorage.clear();
    //   localStorage.setItem(constants.STORAGE.JWT, token);
    //   setUser({ email, name });
    //   navigate('/movies', { replace: true });
    // } catch (e) {
    //   switch (e.message) {
    //     case '409': {
    //       setErrorMessage(constants.MESSAGE.CONFLICT_USER);
    //       break;
    //     }
    //     case '400': {
    //       setErrorMessage(constants.MESSAGE.REGISTER_ERR);
    //       break;
    //     }
    //     default: {
    //       setErrorMessage(constants.MESSAGE.SERVER_ERR);
    //     }
    //   }
    // }
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
