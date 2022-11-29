import TaskItem from 'components/TaskItem';
import React, { useMemo, useState } from 'react';
import './styles.css';
import { useAppSelector } from '../../store/hooks';
import { PropsTask } from 'types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = React.forwardRef((props: PropsTask, ref) => {
  const { tasks } = useAppSelector((state) => state.mainReducer);

  const taskList = useMemo(() => {
    console.log('memo', tasks);
    console.log('columnId: ', props.columnId);
    console.log(tasks[props.columnId]);
    return Object.values(tasks[props.columnId]);
  }, [tasks]);
  const [list, setList] = useState(taskList);
  // TODO Update parameter type
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  function handleOnDragEnd(result: any) {
    if (result.destination) {
      const items = Array.from(list);
      const reorderedItem = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, ...reorderedItem);
      setList(items);
    }
  }

  return (
    // <div className="taskList">
    //   {taskList.map((task) => (
    //     <TaskItem {...task} key={task.id} columnId={props.columnId} />
    //   ))}
    // </div>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="task">
        {(provided) => (
          <div className="taskList" {...provided.droppableProps} ref={provided.innerRef}>
            {taskList.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      {...task}
                      key={task.id}
                      columnId={props.columnId}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    ></TaskItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});
export default TaskList;
