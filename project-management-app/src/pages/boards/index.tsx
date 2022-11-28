import { useEffect } from 'react';
import BoardsList from 'components/BoardsList';
import { useAppDispatch } from '../../store/hooks';
import { getAllBoardsThunk } from '../../store/thunks';
import Button from 'components/ui/button';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { t } from 'i18next';

const Boards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="boards">
        <Button
          className="go_back__button"
          buttonName={t('description.forms.goBackButton')}
          eventHandler={() => navigate(`/`)}
        />
        <BoardsList />
        <Button
          className="create_board__button"
          buttonName="+"
          eventHandler={() => navigate('/boards/create')}
        />
      </div>
    </>
  );
};

export default Boards;
