import { useEffect } from 'react';
import BoardsList from 'components/BoardsList';
import { useAppDispatch } from '../../store/hooks';
import { getAllBoardsThunk } from '../../store/thunks';
import './styles.css';

const Boards = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="boards">
        <BoardsList />
      </div>
    </>
  );
};

export default Boards;
