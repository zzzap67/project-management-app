import CreateNewBoardComponentForm from 'components/Create-new-board-component-form';
import WelcomePage from 'pages/welcome-page';
import './style.css';
import CreateNewColumnForm from 'components/Create-new-column';
import CreateNewTaskForm from 'components/Create-new-task';

const Main = () => {
  return (
    <div className="main">
      {/* <WelcomePage /> */}
      <CreateNewBoardComponentForm />
      <CreateNewColumnForm />
      <CreateNewTaskForm />
    </div>
  );
};

export default Main;
