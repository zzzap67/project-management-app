import React from 'react';
import './Welcome-page.css';
import { ReactComponent as WelcomeImage } from '../../assets/image/image1.svg';
import Button from 'components/ui/button/Button';

const welcomeButtonName = 'Start doing';
const projectTitle = 'Welcome to Project Management App';
const aboutProject =
  "Task management is the link between planning to do something and getting it done. This task management software allows you to centrally manage tasks and their timely completion and allow you to easily monitor all work processes and control the work of the team. Let's get organized together!";

export const WelcomePage: React.FunctionComponent = () => {
  const _imgPath = `${process.env.PUBLIC_URL}/image/`;
  return (
    <div className="welcome_page">
      <section className="welcome_section">
        <div className="welcome_info">
          <article className="project-description">
            <h1 className="description_title">{projectTitle}</h1>
            <span className="description_info"> {aboutProject}</span>
          </article>
          <WelcomeImage />
        </div>
        <Button className="welcome_button" buttonName={welcomeButtonName} />
      </section>
    </div>
  );
};
export default WelcomePage;
