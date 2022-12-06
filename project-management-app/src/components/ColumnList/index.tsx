import ColumnItem from 'components/ColumnItem';
import { useMemo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Draggable } from 'react-beautiful-dnd';
import './styles.css';

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.mainReducer);
  const columnList = useMemo(() => {
    return Object.values(columns).sort((a, b) => Number(a.order) - Number(b.order));
  }, [columns]);
  return (
    <>
      {columnList.map((column, index: number) => {
        return (
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
        );
      })}
    </>
  );
};
export default ColumnList;
