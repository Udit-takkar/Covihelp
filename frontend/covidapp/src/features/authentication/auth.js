import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  email: "",
  usertype: "",
};

// response:
// message: "Created user of id '60a7909eb083ec326c1d84e3' successfully"
// user:
// email: "testing6@gmail.com"
// firstname: "testing"
// lastname: "testing"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhNzkwOWViMDgzZWMzMjZjMWQ4NGUzIn0sImlhdCI6MTYyMTU5NDI3MCwiZXhwIjoxNjIxOTU0MjcwfQ._8Yb7-Af_7e9GSzXf_UC_pO5c8FcSyHXb2TF_4vzJMs"
// usertype: "Customer"
// _id: "60a7909eb083ec326c1d84e3"

const loginURL = "http://localhost:8000/api/auth";
const registerURL = "http://localhost:8000/api/users";

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { firstname, lastname, email, password, usertype },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(registerURL, {
        firstname,
        lastname,
        email,
        usertype,
        password,
      });
      console.log(res.data.response);
      localStorage.setItem("token", res.data.response.user.token);
      return res.data.response;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, usertype }, { rejectWithValue }) => {
    try {
      const res = await axios.post(loginURL, {
        email,
        password,
        usertype,
      });
      console.log(res.data.response);
      localStorage.setItem("token", res.data.response.user.token);
      return res.data.response;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
        usertype: "",
      });
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      Object.assign(state, {
        loading: true,
        error: null,
        isLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
        usertype: "",
      });
    },
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        firstName: action.payload.user.firstname,
        lastName: action.payload.user.lastname,
        email: action.payload.user.email,
        usertype: action.payload.user.usertype,
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
        usertype: "",
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
        usertype: "",
      });
    },
    [signup.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        isLoggedIn: true,
        firstName: action.payload.user.firstname,
        lastName: action.payload.user.lastname,
        email: action.payload.user.email,
        usertype: action.payload.user.usertype,
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
        usertype: "",
      });
    },
  },
});

export default authSlice.reducer;
export const isUserLoggedIn = (state) => state.auth.isLoggedIn;
export const getName = (state) => state.auth.firstName;
export const getEmail = (state) => state.auth.email;
export const { logoutUser } = authSlice.actions;
export const getUserType = (state) => state.auth.usertype;
