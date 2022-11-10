import React, { useEffect } from 'react';
import BoardsList from 'components/BoardsList';
import { useAppDispatch } from '../../store/hooks';
import { getAllBoardsThunk } from '../../store/thunks';

const Boards = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <>
      <div> -- - - - - - --</div>
      <BoardsList />
    </>
  );
};

export default Boards;
