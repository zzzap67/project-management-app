export const ru = {
  MESSAGE: {
    NAME_ERR: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
    EMAIL_ERR: 'Неверный формат email',
    PASSWORD_ERR: 'Пароль должен быть больше 4 символов',
  },
  REGISTER_FORM: {
    title: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    text: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkTo: '/signin',
    inputsData: [
      {
        id: 'name',
        label: 'Имя',
        type: 'text',
      },
      {
        id: 'login',
        label: 'Логин',
        type: 'text',
      },
      {
        id: 'password',
        label: 'Пароль',
        type: 'password',
      },
    ],
  },
};
