import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
};

const loginURL = "https://localhost:8080/api/auth";
const registerURL = "https://localhost:8080/api/users";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(registerURL, {
        user: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      localStorage.setItem("token", res.data.user.token);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(loginURL, {
        user: {
          email,
          password,
        },
      });

      localStorage.setItem("token", res.data.user.token);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
      });
    },
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        firstName: action.payload.user.username,
        lastName: action.payload.user.lastName,
        email: action.payload.user.email,
      });
    },
    [login.rejected]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: action.payload,
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
      });
    },
    [signup.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
      });
    },
    [signup.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        firstName: action.payload.user.username,
        lastName: action.payload.user.lastName,
        email: action.payload.user.email,
      });
    },
    [signup.rejected]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: action.payload,
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
      });
    },
  },
});

export default authSlice.reducer;
