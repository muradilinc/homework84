import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { AuthFields } from '../../types';

export const register = createAsyncThunk<void, AuthFields>(
  'auth/login',
  async (user) => {
    const result = await axiosApi.post('/users', user);
    if (result.status === 200) {
      location.href = '/login';
    }
  },
);

export const login = createAsyncThunk<void, AuthFields>(
  'auth/login',
  async (user) => {
    const result = await axiosApi.post('/users/sessions', user);
    const userData = result.data;
    localStorage.setItem('user', JSON.stringify(userData));
    if (result.statusText === 'OK'){
      location.href = '/';
    }
  },
);