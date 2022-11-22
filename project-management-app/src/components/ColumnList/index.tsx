import ColumnItem from 'components/ColumnItem';
import React, { useMemo, useState } from 'react';
import './styles.css';
import { useAppSelector } from '../../store/hooks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.mainReducer);

  const columnList = useMemo(() => {
    return Object.values(columns);
  }, [columns]);
  const [list, setList] = useState(columnList);

  function handleOnDragEnd(result) {
    if (result.destination) {
      const items = Array.from(list);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setList(items);
    }
  }
  return (
    <div className="columnList">
      {columnList.map((column) => {
        return <ColumnItem {...column} key={column.id} />;
      })}
    </div>
    // <DragDropContext onDragEnd={handleOnDragEnd}>
    //   <Droppable droppableId="column">
    //     {(provided) => (
    //       <div className="columnList" {...provided.droppableProps} ref={provided.innerRef}>
    //         {list.map((column, index) => (
    //           <Draggable key={column.id} draggableId={column.id} index={index}>
    //             {(provided) => (
    //               <div
    //                 ref={provided.innerRef}
    //                 {...provided.draggableProps}
    //                 {...provided.dragHandleProps}
    //               >
    //                 <ColumnItem {...column} key={column.id} ref={provided.innerRef} />
    //               </div>
    //             )}
    //           </Draggable>
    //         ))}
    //       </div>
    //     )}
    //   </Droppable>
    // </DragDropContext>
  );
};
export default ColumnList;
