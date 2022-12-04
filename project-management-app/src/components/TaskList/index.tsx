import React, { useMemo } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from 'components/TaskItem';
import { useAppSelector } from '../../store/hooks';
import { PropsTask } from 'types';
import './styles.css';

const TaskList = React.forwardRef((props: PropsTask) => {
  const { tasks } = useAppSelector((state) => state.mainReducer);
  const taskList = useMemo(() => {
    return Object.values(tasks[props.columnId]).sort((a, b) => Number(a.order) - Number(b.order));
  }, [props.columnId, tasks]);
  return (
    <Droppable droppableId={`column/${props.columnId}`} type="TASK" direction="vertical">
      {(provided) => (
        <div className="task_list" {...provided.droppableProps} ref={provided.innerRef}>
          {taskList.map((task, index) => (
            <Draggable key={task.id} draggableId={`task/${task.id}`} index={index + 1}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskItem {...task} columnId={props.columnId}></TaskItem>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
});
export default TaskList;
