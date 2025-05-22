"use client"
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { jwtDecode } from "jwt-decode";
import { updateAxiosHeaders } from "@services/axios.global";

type TToken = {
  id: string,
  name: string,
  role: string,
  iat: string,
  exp: string
}

interface IAuthState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null,
  token: string | null,
  user: TToken | null
}

const initialState: IAuthState = {
  loading: 'idle',
  error: null,
  token: null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
      updateAxiosHeaders(action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('userToken');
      updateAxiosHeaders(null);
    }
  },
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
      state.user = jwtDecode(action.payload.token);
      updateAxiosHeaders(action.payload.token);
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
export const { setToken, logout } = authSlice.actions;
