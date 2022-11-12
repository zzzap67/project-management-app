export const ru = {
  MESSAGE: {
    NAME_ERR: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
    EMAIL_ERR: 'Неверный формат email',
  },
  REGISTER_FORM: {
    title: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
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
        id: 'email',
        label: 'E-mail',
        type: 'email',
      },
      {
        id: 'password',
        label: 'Пароль',
        type: 'password',
      },
    ],
    inputsBoardData: [
      {
        id: 'title',
        label: 'Заголовок',
        type: 'text',
      },
      {
        id: 'description',
        label: 'Описание',
        type: 'text',
      },
    ],
  },
};
