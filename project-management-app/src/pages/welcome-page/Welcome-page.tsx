import React from 'react';
import './Welcome-page.css';
import { ReactComponent as WelcomeImage } from '../../assets/image/image1.svg';
import Button from 'components/ui/button/Button';
import DeveloperCard from 'components/ui/developer-card/Developer-card';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export const WelcomePage: React.FunctionComponent = () => {
  const { t } = useTranslation('translation');
  return (
    <div className="welcome_page">
      <section className="welcome_section">
        <div className="welcome_info">
          <article className="project-description">
            <h1 className="description_title">{t('description.welcomePage.projectTitle')}</h1>
            <span className="description_info"> {t('description.welcomePage.aboutProject')}</span>
          </article>
          <WelcomeImage className="welcome_image" />
        </div>
        <Link className="welcome_button__link" to="/register">
          <Button
            className="welcome_button"
            buttonName={t('description.welcomePage.welcomeButtonName')}
          />
        </Link>
      </section>
      <section className="developer_section">
        <DeveloperCard />
      </section>
    </div>
  );
};
export default WelcomePage;
