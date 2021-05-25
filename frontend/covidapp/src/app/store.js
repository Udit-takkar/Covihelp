import { configureStore } from "@reduxjs/toolkit";

import auth from "../features/authentication/auth";
import driverAuth from "../features/authentication/driverAuth";
import booking from "../features/booking/Booking";
export const store = configureStore({
  reducer: {
    auth,
    driverAuth,
    booking,
  },
});
