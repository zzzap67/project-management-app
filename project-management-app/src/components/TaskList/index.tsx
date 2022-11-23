import TaskItem from 'components/TaskItem';
import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PropsTask } from 'types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getAllTasksThunk, updateTaskThunk } from 'store/thunks';
import { useParams } from 'react-router-dom';

const TaskList = React.forwardRef((props: PropsTask, ref) => {
  const { tasks } = useAppSelector((state) => state.mainReducer);

  const dispatch = useAppDispatch();
  const params = useParams();
  const boardId = params.id;
  const taskList = useMemo(() => {
    return Object.values(tasks[props.columnId]);
  }, [tasks]);

  useEffect(() => {
    dispatch(
      getAllTasksThunk({
        columnId: props.columnId as string,
        boardId: boardId as string,
      })
    );
  }, [dispatch]);

  console.log(taskList);
  const handleOnDragEnd = (result) => {
    if (result.destination) {
      const items = Array.from(taskList);
      const reorderedItem = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, ...reorderedItem);
    }
  };

  return (
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
