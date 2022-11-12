import { IBoard } from 'types';
import './styles.css';

const BoardItem = (props: IBoard) => {
  const { id, title, description } = props;
  return (
    <>
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </>
  );
};

export default BoardItem;
