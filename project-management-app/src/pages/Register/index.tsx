import { useState } from 'react';
import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from '../../components/Form';
import logo from '../../assets/icons/logo.svg';
import { ru } from '../../components/locales/ru';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const registerData = ru.REGISTER_FORM;

  const onSubmit = async (values: Record<string, string>) => {
    console.log({ values });

  };

  return (
    <main className="register">
      <NavLink to="/" className="register__link">
        <img src={logo} alt="Логотип: зеленый кружок" className="register__logo" />
      </NavLink>
      <Form
        formData={registerData}
        errorMessage={errorMessage}
        className="register__form"
        onSubmit={onSubmit}
      />
    </main>
  );
};

export default Register;
