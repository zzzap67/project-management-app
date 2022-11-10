import BoardItem from 'components/BoardItem';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { useAppSelector } from '../../store/hooks';

const BoardsList = () => {
  const { boards } = useAppSelector((state) => state.mainReducer);

  const boardsList = useMemo(() => {
    return Object.values(boards);
  }, [boards]);

  return (
    <div>
      {boardsList.map((board) => (
        <Link to={`/board/${board.id}`} key={board.id}>
          <BoardItem {...board} />
        </Link>
      ))}
    </div>
  );
};
export default BoardsList;
