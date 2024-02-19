import { createSlice } from '@reduxjs/toolkit';
import { login } from './authThunk';

interface AuthState {
  loginLoading: boolean;
}

const initialState: AuthState = {
  loginLoading: false,
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loginLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
    });
  }
});

export const authReducer = authSlice.reducer;