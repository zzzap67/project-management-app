import BoardItem from 'components/BoardItem';
import React, { useMemo } from 'react';
import './styles.css';
import { useAppSelector } from '../../store/hooks';

const BoardsList = () => {
  const { boards } = useAppSelector((state) => state.mainReducer);

  const boardsList = useMemo(() => {
    return Object.values(boards);
  }, [boards]);

  return (
    <div className="boardList">
      {boardsList.map((board) => (
        <BoardItem {...board} key={board.id} />
      ))}
    </div>
  );
};
export default BoardsList;
