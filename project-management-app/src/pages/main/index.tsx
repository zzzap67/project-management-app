import CreateBoardForm from 'components/Board-create-form';
import BoardItem from 'components/BoardItem';
import { ru } from 'components/locales/ru';
import WelcomePage from 'pages/welcome-page';
import './style.css';

const Main = () => {
  return (
    <div className="main">
      {/* <WelcomePage /> */}
      <BoardItem id={'dfb'} title={'jjk'} description={'kll'} />
      <CreateBoardForm
        formData={ru.REGISTER_FORM}
        errorMessage={''}
        className={'board'}
        onSubmit={() => console.log('Create board')}
      />
    </div>
  );
};

export default Main;
