import CreateNewBoardComponentForm from 'components/Create-new-board-component-form';
import WelcomePage from 'pages/welcome-page';
import './style.css';
import CreateNewColumnForm from 'components/Create-new-column';
import CreateNewTaskForm from 'components/Create-new-task';
import ColumnItem from 'components/ColumnItem';

const Main = () => {
  return (
    <div className="main">
      {/* <WelcomePage /> */}
      <CreateNewTaskForm />
      <ColumnItem id={'fbdf'} title={'dbbf'} description={'dfbd'} />
    </div>
  );
};

export default Main;
