import React from 'react';
import { Tasks } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { deleteTask, getTasks } from '../../store/tasks/TasksThunk';

interface Props {
  tasks: Tasks[];
}

const TasksItem: React.FC<Props> = ({tasks}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    await dispatch(deleteTask(id));
    await dispatch(getTasks());
  };

  return (
    <div className="flex flex-col gap-y-3">
      {
        tasks.map(task => (
          <div key={task._id} className="border border-black p-[10px] flex justify-between items-start">
            <div>
              <h4>{task.title}</h4>
              <p>{task.description ? task.description : 'No description'}</p>
              <p>status: {task.status}</p>
            </div>
            <div className="flex gap-x-3">
              <button onClick={() => handleDelete(task._id)}>delete</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default TasksItem;