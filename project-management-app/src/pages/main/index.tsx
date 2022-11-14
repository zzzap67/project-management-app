import CreateNewTaskForm from 'components/Create-new-task';
import WelcomePage from 'pages/welcome-page';
import './style.css';

const Main = () => {
  return (
    <div className="main">
      {/* <WelcomePage /> */}
      <CreateNewTaskForm />
    </div>
  );
};

export default Main;
