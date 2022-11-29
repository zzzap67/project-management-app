export const ru = {
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
  LOGIN_FORM: {
    title: 'gladToSee',
    buttonText: 'signin',
    text: 'notRegistered',
    linkText: 'register',
    linkTo: '/register',
    inputsData: [
      {
        id: 'login',
        label: 'Логин',
        type: 'text',
        error: '',
      },
      {
        id: 'password',
        label: 'Пароль',
        type: 'password',
        error: '',
      },
    ],
  },
  BOARD_FORM: {
    buttonBoardText: 'Сохранить',
    cancelButtonText: 'Отменить',
    linkText: '',
    buttonText: '',
    text: '',
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
    linkText: '',
    text: '',
    buttonText: '',
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
    linkText: '',
    text: '',
    buttonText: '',
    linkTo: `/board/`,
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
    linkText: '',
    text: '',
    buttonText: '',
    title: 'createTask',
    linkTo: '/board/',
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
