import Button from 'components/ui/button';
import i18n from 'i18n/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/image/logo2.svg';
import './style.css';

const Header: React.FunctionComponent = () => {
  const [scrollEvent, setScrollEvent] = useState(false);
  const [userAuthorized, setUserAuthorized] = useState(true);

  const changeHeaderColor = () => {
    window.scrollY > 60 ? setScrollEvent(true) : setScrollEvent(false);
  };

  window.addEventListener('scroll', () => changeHeaderColor());
  const [language, setLanguage] = useState('en');
  const changeLanguage = (language: string) => {
    if (language === 'en') {
      setLanguage('ru');
      i18n.changeLanguage(language);
    } else if (language === 'ru') {
      setLanguage('en');
      i18n.changeLanguage(language);
    }
  };

  const { t } = useTranslation('translation');
  return userAuthorized ? (
    <header className={scrollEvent ? 'header_color' : 'header_white'}>
      <Link to="/boards">
        <Button
          className="link-to-add-new-board_button"
          buttonName={t('description.header.newBoard')}
        />
      </Link>
      <div className="nav">
        <Link to="/">
          <Button
            className="link-to-main-page_button"
            buttonName={t('description.header.mainPage')}
          />
        </Link>
        <Link to="/">
          <Button
            className="link-to-edit-profile_button"
            buttonName={t('description.header.editProfile')}
          />
        </Link>
        <Link to="/">
          <Button
            className="link-to-sign-out_button"
            buttonName={t('description.header.signOut')}
          />
        </Link>
        <Button
          className="change_language_button"
          buttonName={'EN/RU'}
          eventHandler={() => changeLanguage(language)}
        />
      </div>
    </header>
  ) : (
    <header className={scrollEvent ? 'header_color' : 'header_white'}>
      <Link to="/" className="logo_link">
        <Logo className="logo" />
      </Link>
      <div className="nav">
        <Link to="/">
          <Button
            className="link-to-main-page_button"
            buttonName={t('description.header.mainPage')}
          />
        </Link>
        <Link to="/register">
          <Button className="link-to-sign-up_button" buttonName={t('description.header.signUp')} />
        </Link>
        <Link to="/signin">
          <Button className="link-to-sign-in_button" buttonName={t('description.header.signIn')} />
        </Link>
        <Button
          className="change_language_button"
          buttonName={'EN/RU'}
          eventHandler={() => changeLanguage(language)}
        />
      </div>
    </header>
  );
};

export default Header;
