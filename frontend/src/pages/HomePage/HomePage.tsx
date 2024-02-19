import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTasks } from '../../store/tasks/tasksSlice';
import { getTasks } from '../../store/tasks/TasksThunk';
import TasksItem from '../../components/Tasks/TasksItem';

const HomePage = () => {
  const navigate = useNavigate();
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      return navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <div className="flex justify-between my-[25px]">
        <h1>Tasks</h1>
        <button onClick={logout} className="bg-green-400 px-[25px] py-[5px]">Logout</button>
      </div>
      <TasksItem tasks={tasks} />
    </div>
  );
};

export default HomePage;