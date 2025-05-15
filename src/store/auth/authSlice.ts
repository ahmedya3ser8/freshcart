"use client"
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

interface IAuthState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null,
  token: string | null
}

const initialState: IAuthState = {
  loading: 'idle',
  error: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    })
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = 'succeeded';
    })
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.payload && typeof action.payload === 'string') {
        state.error = action.payload;
      }
    })
    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    })
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.token = action.payload.token;
      localStorage.setItem('userToken', action.payload.token);
    })
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = 'failed';
      if (action.payload && typeof action.payload === 'string') {
        state.error = action.payload;
      }
    })
  }
})

export default authSlice.reducer;
