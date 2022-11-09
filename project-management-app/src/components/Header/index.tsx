import Button from 'components/ui/button/Button';
import i18n from 'i18n/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Routes } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/image/logo2.svg';
import './styles.css';

const Header: React.FunctionComponent = () => {
  const { t } = useTranslation('translation');
  return (
    <header className="header">
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
          buttonName="EN"
          eventHandler={() => i18n.changeLanguage('ru')}
        />
      </div>
    </header>
  );
};

export default Header;
