import TaskItem from 'components/TaskItem';
import React, { useMemo } from 'react';
import './styles.css';
import { useAppSelector } from '../../store/hooks';

const TaskList = () => {
  const { tasks } = useAppSelector((state) => state.mainReducer);

  const taskList = useMemo(() => {
    return Object.values(tasks);
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
