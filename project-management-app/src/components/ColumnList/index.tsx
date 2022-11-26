import ColumnItem from 'components/ColumnItem';
import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import './styles.css';

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.mainReducer);
  const columnList = useMemo(() => {
    console.log(columns);
    return Object.values(columns).sort((a, b) => Number(a.order) - Number(b.order));
  }, [columns]);

  return (
    <div className="columnList">
      {columnList.map((column, index: number) => {
        return (
          <Droppable key={index + 1} droppableId={`column/${column.id}`} type="COLUMN">
            {(provided: DroppableProvided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Draggable key={column.id} draggableId={`column/${column.id}`} index={index + 1}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ColumnItem {...column} key={column.id} />
                      </div>
                    )}
                  </Draggable>
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
