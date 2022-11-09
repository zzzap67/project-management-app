import BoardItem from 'components/BoardItem';
import React from 'react';
import { Link } from 'react-router-dom';
import { IBoardsList } from 'types';
import './styles.css';

const BoardsList = ({ data }: IBoardsList) => {
  return (
    <div>
      {data.map((board) => (
        <Link to={`/board/${board.id}`} key={board.id}>
          <BoardItem {...board} />
        </Link>
      ))}
    </div>
  );
};
export default BoardsList;
