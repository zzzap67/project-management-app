import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    debug: true,
    fallbackLng: 'en',
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
              editProfile: 'Edit Profile',
              newBoard: 'New Board',
            },
            welcomePage: {
              welcomeButtonName: 'Start doing',
              projectTitle: 'Welcome to Project Management App',
              aboutProject:
                "Task management is the link between planning to do something and getting it done. This task management software allows you to centrally manage tasks and their timely completion and allow you to easily monitor all work processes and control the work of the team. Let's get organized together!",
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
                'Управление задачами — это связующее звено между планированием чего-то и его выполнением. Это программное обеспечение для управления задачами позволяет централизованно управлять задачами и их своевременным выполнением, а также позволяет легко контролировать все рабочие процессы и контролировать работу команды. Давайте организуемся вместе!',
            },
          },
        },
      },
    },
  });
export default i18n;
