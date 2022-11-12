import BoardItem from 'components/BoardItem';
import WelcomePage from 'pages/welcome-page';
import './style.css';

const Main = () => {
  return (
    <div className="main">
      <WelcomePage />
      <BoardItem id={'dfb'} title={'dfb'} description={'dfb'} />
    </div>
  );
};

export default Main;
