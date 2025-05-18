import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

type TFormData = {
  name: string,
  email: string,
  password: string,
  rePassword: string,
  phone: string
}

const actAuthRegister = createAsyncThunk('auth/actAuthRegister', async (formData: TFormData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post(`/api/v1/auth/signup`, formData);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message || error.message);
    } else {
      return rejectWithValue('an unexcepted error');
    }
  }
})

export default actAuthRegister;
