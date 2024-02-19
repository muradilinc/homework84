import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';

export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async () => {
    const userString = localStorage.getItem('user');

    if (!userString) {
      location.href = '/login';
      throw new Error('User not found in local storage');
    }

    const user = JSON.parse(userString);

    if (!user.user.token) {
      throw new Error('User token not found in local storage');
    }

    const response = await axiosApi.get('/tasks', {
      headers: {
        'Authorization': 'Bearer ' + user.user.token,
      }
    });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  'tasks/delete',
  async (id) => {
    const userString = localStorage.getItem('user');

    if (!userString) {
      location.href = '/login';
      throw new Error('User not found in local storage');
    }

    const user = JSON.parse(userString);

    if (!user.user.token) {
      throw new Error('User token not found in local storage');
    }

    await axiosApi.delete(`/tasks/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + user.user.token,
      }
    });
  }
);