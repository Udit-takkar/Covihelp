import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: null,
  ambulance: {},
  userCoordinates: [],
  ambulanceCoordinates: [],
  bookedtime: null,
  status: "pending",
};

const createurl = "http://localhost:8000/api/bookings/createBooking";
export const createbooking = createAsyncThunk(
  "booking/createbooking",
  async (
    { user, ambulance, userCoordinates, ambulanceCoordinates },
    { rejectWithValue }
  ) => {
    console.log("reached thunk");
    try {
      const res = await axios.post(createurl, {
        user,
        ambulance,
        userCoordinates,
        ambulanceCoordinates,
        bookedtime: Date.now(),
        status: "pending",
      });
      console.log(res.data);

      return res.data;
    } catch (e) {
      console.log(e.response.data);
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: {
    [createbooking.pending]: (state, action) => {
      Object.assign(state, {
        loading: false,
        error: null,
        user: null,
        ambulance: {},
        userCoordinates: [],
        ambulanceCoordinates: [],
        bookedtime: null,
        status: "pending",
      });
    },
    [createbooking.fulfilled]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        user: action.payload.booking.user,
        ambulance: action.payload.booking.ambulance,
        userCoordinates: action.payload.booking.userCoordinates,
        ambulanceCoordinates: action.payload.booking.ambulanceCoordinates,
        bookedtime: action.payload.booking.bookedtime,
        status: "booked",
      });
    },
    [createbooking.rejected]: (state, action) => {
      console.log(action.payload);
      Object.assign(state, {
        loading: false,
        error: null,
        user: null,
        ambulance: {},
        userCoordinates: [],
        ambulanceCoordinates: [],
        bookedtime: null,
        status: "pending",
      });
    },
  },
});

export default bookingSlice.reducer;
export const getUserCoordinates = (state) => state.booking.userCoordinates;
export const ambulanceCoordinates = (state) =>
  state.booking.ambulanceCoordinates;
export const getBookingStatus = (state) => state.booking.status;
export const getAmbulance = (state) => state.booking.ambulance;
