import { createSlice } from '@reduxjs/toolkit';
import { Tasks } from '../../types';
import { getTasks } from './TasksThunk';
import { RootState } from '../../app/store';

interface TasksState {
  tasks: Tasks[];
  getLoading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  getLoading: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.getLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, {payload: tasks}) => {
      state.getLoading = false;
      state.tasks = tasks;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.getLoading = false;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const selectTasks = (state: RootState) => state.tasks.tasks;