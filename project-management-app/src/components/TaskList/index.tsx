import TaskItem from 'components/TaskItem';
import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PropsTask } from 'types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getAllTasksThunk, updateTaskOrderThunk, updateTaskThunk } from 'store/thunks';
import { useParams } from 'react-router-dom';
import ColumnItem from 'components/ColumnItem';

const TaskList = React.forwardRef((props: PropsTask, ref) => {
  const { tasks } = useAppSelector((state) => state.mainReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id;
  const taskList = useMemo(() => {
    return Object.values(tasks[props.columnId]);
    // .sort((a, b) => a.order - b.order);
  }, [tasks]);

  const [list, setList] = useState(taskList);
  // useEffect(() => {
  //   dispatch(
  //     getAllTasksThunk({
  //       columnId: props.columnId as string,
  //       boardId: boardId as string,
  //     })
  //   );
  // }, [dispatch]);

  const handleOnDragEnd = (result) => {
    if (result.destination) {
      const items = Array.from(list);
      const reorderedItem = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, ...reorderedItem);
      setList(items);
      console.log('dragEnd');
      // {columnId,boardId,tasks:{firstOrdered:taskList[result.destination.index + 1],secondOrdered{id,order}}}
      // dispatch(
      //   updateTaskOrderThunk({
      //     columnId: props.columnId as string,
      //     boardId: boardId as string,
      //     firstTaskId: taskList[result.source.index].id,
      //     secondTaskId: taskList[result.destination.index].id,
      //     firstTaskTitle: items[result.source.index].title,
      //     firstTaskDescription: items[result.source.index].description,
      //     secondTaskTitle: items[result.destination.index].title,
      //     secondTaskDescription: items[result.destination.index].description,
      //     firstOrder: items[result.destination.index].order,
      //     secondOrder: items[result.source.index].order,
      //     userId: user.id,
      //   })
      // );
    }
  };

  return (
    // <div className="taskList">
    //   {taskList.map((task, index) => (
    //     <TaskItem {...task} key={task.id} columnId={props.columnId} />
    //   ))}
    // </div>
    // <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId={props.columnId}>
      {(provided) => (
        <div className="taskList" {...provided.droppableProps} ref={provided.innerRef}>
          {taskList.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index + 1}>
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
