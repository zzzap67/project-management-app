import ColumnItem from 'components/ColumnItem';
import { useMemo } from 'react';
import './styles.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id;
  const columnList = useMemo(() => {
    return Object.values(columns);
  }, [columns]);

  return (
    <div className="columnList">
      {columnList.map((column, index: number) => {
        return (
          <Droppable key={index + 1} droppableId={column.id}>
            {(provided: DroppableProvided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <ColumnItem {...column} key={column.id} />
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        );
      })}
    </div>
  );
};
export default ColumnList;
