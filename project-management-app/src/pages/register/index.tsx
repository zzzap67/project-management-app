import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import logo from '../../assets/icons/logo.svg';
import { ru } from '../../components/locales/ru';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signUp, signIn } from '../../store/thunks';

const Register = () => {
  const navigate = useNavigate();
  const registerData = ru.REGISTER_FORM;
  const dispatch = useAppDispatch();

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
        console.log('token', token);
      }
      navigate('/signin', { replace: true });
    }
    //user
    // :
    // error
    // :
    // null
    // id
    // :
    // "0087bade-bf28-4f9c-970b-ba69b0869d3e"
    // isAuth
    // :
    // true
    // isLoading
    // :
    // false
    // login
    // :
    // "torta"
    // name
    // :
    // "sdv"

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
