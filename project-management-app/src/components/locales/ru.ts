export const ru = {
  MESSAGE: {
    NAME_ERR: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
    EMAIL_ERR: 'Неверный формат email',
    PASSWORD_ERR: 'Пароль должен быть больше 4 символов',
  },
  REGISTER_FORM: {
    title: 'welcome',
    buttonText: 'signUp',
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
    text: 'alreadyRegistered',
    linkText: 'signin',
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
  BOARD_FORM: {
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
    EditTitle: 'editBoard',
    linkTo: '/boards',
    title: 'createBoard',
    inputsData: [
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
  BOARD_EDIT_FORM: {
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
    linkTo: '/boards',
    title: 'editBoard',
    inputsData: [
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
  COLUMN_FORM: {
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
    linkTo: '/board/:id',
    title: 'createColumn',
    inputsData: [
      {
        id: 'title',
        label: 'Заголовок',
        type: 'text',
      },
    ],
  },
  TASK_FORM: {
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
    title: 'createTask',
    linkTo: '/board/:id',
    inputsData: [
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
