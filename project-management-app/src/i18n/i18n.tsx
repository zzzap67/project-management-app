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
            },
          },
        },
      },
    },
  });
export default i18n;
