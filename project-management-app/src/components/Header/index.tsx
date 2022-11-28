import Button from 'components/ui/button';
import i18n from 'i18n/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/image/logo2.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOut } from '../../store/userSlice';
import { ELocalStorage, Languages } from '../../types';
import './style.css';

const Header: React.FunctionComponent = () => {
  const [scrollEvent, setScrollEvent] = useState(false);
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  const dispatch = useAppDispatch();

  const changeHeaderColor = () => {
    window.scrollY > 60 ? setScrollEvent(true) : setScrollEvent(false);
  };

  window.addEventListener('scroll', () => changeHeaderColor());
  //const [language, setLanguage] = useState('en');
  const changeLanguage = () => {
    if (i18n.language === Languages.En) {
      i18n.changeLanguage(Languages.Ru);
    } else {
      i18n.changeLanguage(Languages.En);
    }
  };

  const onSignOut = () => {
    dispatch(signOut());
    localStorage.removeItem(ELocalStorage.token);
    localStorage.removeItem(ELocalStorage.userId);
  };

  const { t } = useTranslation('translation');
  return isAuth ? (
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
        <Button
          className="link-to-sign-out_button"
          buttonName={t('description.header.signOut')}
          eventHandler={onSignOut}
        />
        <div className="language-switch">
          <input
            id="language-toggle"
            className="language-toggle language-toggle-flat"
            type="checkbox"
            defaultChecked={i18n.language === Languages.Ru}
            onClick={() => changeLanguage()}
          />
          <label htmlFor="language-toggle" />
          <span className="on">EN</span>
          <span className="off">RU</span>
        </div>
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
        <div className="language-switch">
          <input
            id="language-toggle"
            className="language-toggle language-toggle-flat"
            type="checkbox"
            defaultChecked={i18n.language === Languages.Ru}
            onClick={() => changeLanguage()}
          />
          <label htmlFor="language-toggle" />
          <span className="on">EN</span>
          <span className="off">RU</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
