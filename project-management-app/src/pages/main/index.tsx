import CreateNewTaskForm from 'components/Create-new-task';
import TaskItem from 'components/TaskItem';
import WelcomePage from 'pages/welcome-page';
import './style.css';

const Main = () => {
  return (
    <div className="main">
      {/* <WelcomePage /> */}
      <CreateNewTaskForm />
      <TaskItem key={''} id={''} title={'fbdbf'} description={''} />
    </div>
  );
};

export default Main;
