import React, { useEffect } from 'react';
import BoardsList from 'components/BoardsList';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getBoardsList } from 'api';
import { setBoards } from 'store/mainSlice';

const Boards = () => {
  const { boardsList } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  const getBoards = async () => {
    const data = await getBoardsList();
    if (data) {
      dispatch(setBoards(data));
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <div> -- - - - - - --</div>
      <BoardsList data={boardsList} />
    </>
  );
};

export default Boards;
