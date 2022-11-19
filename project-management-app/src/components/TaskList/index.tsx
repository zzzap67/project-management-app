import TaskItem from 'components/TaskItem';
import React, { useMemo } from 'react';
import './styles.css';
import { useAppSelector } from '../../store/hooks';
import { PropsTask } from 'types';

const TaskList = (props: PropsTask) => {
  const { tasks } = useAppSelector((state) => state.mainReducer);

  const taskList = useMemo(() => {
    return Object.values(tasks[props.columnId]);
  }, [tasks]);

  return (
    <div className="taskList">
      {taskList.map((task) => (
        <TaskItem {...task} key={task.id} />
      ))}
    </div>
  );
};
export default TaskList;
