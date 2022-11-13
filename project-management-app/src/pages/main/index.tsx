import CreateNewBoardComponentForm from 'components/Create-new-board-component-form';
import BoardItem from 'components/BoardItem';
import WelcomePage from 'pages/welcome-page';
import './style.css';
import CreateNewColumnForm from 'components/Create-new-column';

const Main = () => {
  return (
    <div className="main">
      {/* <WelcomePage /> */}

      <BoardItem id={'dfb'} title={'jjk'} description={'kll'} />
      <CreateNewBoardComponentForm />
      <CreateNewColumnForm />
    </div>
  );
};

export default Main;
