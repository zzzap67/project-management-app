import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Languages } from 'types';

i18n
  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    debug: true,
    fallbackLng: Languages.En,
    supportedLngs: [Languages.En, Languages.Ru],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    resources: {
      en: {
        translation: {
          description: {
            header: {
              mainPage: 'Main Page',
              signUp: 'Sign Up',
              signIn: 'Sign In',
              signOut: 'Sign Out',
              editProfile: 'Edit Index',
              newBoard: 'New Board',
            },
            welcomePage: {
              welcomeButtonName: 'Start doing',
              projectTitle: 'Welcome to Project Management App',
              aboutProject:
                "Task management is the link between planning to do something and getting it done. This task management software allows you to centrally manage tasks and their timely completion and allow you to easily monitor all work processes and control the work of the team. Let's get organized together! This app has been developed during education on React course of RS School",
            },
            forms: {
              welcome: 'Welcome!',
              editUser: 'Edit user profile',
              save: 'Save profile',
              signUp: 'Sign Up!',
              createBoard: 'Create board',
              editBoard: 'Edit board',
              createColumn: 'Add сolumn',
              createTask: 'Add task',
              okButtonText: 'Ok',
              cancelButtonText: 'Cancel',
              confirmButtonText: 'Confirm',
              deleteQuestion: 'Do You Really Want To Delete',
              alreadyRegistered: 'Already registered?',
              signin: 'Sign In',
              linkTo: '/signin',
              gladToSee: 'Glad to see you again!',
              notRegistered: 'Have not registered yet?',
              register: 'Register',
              inputs: {
                nameLabel: 'Name',
                emailLabel: 'E-mail',
                passwordLabel: 'Password',
                descriptionLabel: 'Description',
                titleLabel: 'Title',
                namePlaceholder: 'Inter name',
                emailPlaceholder: 'Inter E-mail',
                passwordPlaceholder: 'Inter password',
                descriptionPlaceholder: 'Inter description',
                titlePlaceholder: 'Inter title',
                loginLabel: 'Login',
                loginPlaceholder: 'Inter login',
              },
            },
            message: {
              nameError: 'Name can only contain Latin, Cyrillic, space or hyphen',
              emailError: 'Email format is invalid',
              passwordError: 'Password should contain min 4 symbols',
              validationMessage: 'Please fill out this field.',
            },
          },
        },
      },
      ru: {
        translation: {
          description: {
            header: {
              mainPage: 'Главная страница',
              signUp: 'Регистрация',
              signIn: 'Войти',
              signOut: 'Выйти',
              editProfile: 'Редактировать профиль',
              newBoard: 'Новая доска',
            },
            welcomePage: {
              welcomeButtonName: 'Начать',
              projectTitle: 'Добро пожаловать в Project Management App',
              aboutProject:
                'Управление задачами — это связующее звено между планированием чего-то и его выполнением. Это программное обеспечение для управления задачами позволяет централизованно управлять задачами и их своевременным выполнением, а также позволяет легко контролировать все рабочие процессы и контролировать работу команды. Давайте организуемся вместе! Данное приложение было реализовано в рамках обучения на курсе “React” в RS School',
            },
            forms: {
              welcome: 'Добро пожаловать!',
              editUser: 'Редактировать профиль',
              save: 'Сохранить профиль',
              signUp: 'Зарегистрироваться',
              createBoard: 'Создать доску',
              editBoard: 'Редактировать доску',
              createTask: 'Добавить карточку',
              createColumn: 'Добавить колонку',
              okButtonText: 'Да',
              cancelButtonText: 'Отменить',
              confirmButtonText: 'Сохранить',
              deleteQuestion: 'Вы уверены что хотите удалить',
              alreadyRegistered: 'Уже зарегистрированы?',
              signin: 'Войти',
              linkTo: '/signin',
              gladToSee: 'Рады видеть!',
              notRegistered: 'Ещё не зарегистрированы?',
              register: 'Регистрация',
              inputs: {
                nameLabel: 'Имя',
                emailLabel: 'E-mail',
                passwordLabel: 'Пароль',
                descriptionLabel: 'Описание',
                titleLabel: 'Заголовок',
                namePlaceholder: 'Введите имя',
                emailPlaceholder: 'Введите E-mail',
                passwordPlaceholder: 'Введите пароль',
                descriptionPlaceholder: 'Введите описание',
                titlePlaceholder: 'Введите заголовок',
                loginLabel: 'Логин',
                loginPlaceholder: 'Введите логин',
              },
            },
            message: {
              nameError: 'Имя может содержать только латиницу, кириллицу, пробел или дефис',
              emailError: 'Неверный формат email',
              passwordError: 'Пароль должен быть больше 4 символов',
              validationMessage: 'Пожалуйста, заполните это поле.',
            },
          },
        },
      },
    },
  });
export default i18n;
