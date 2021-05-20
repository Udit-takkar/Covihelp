import { configureStore } from "@reduxjs/toolkit";

import auth from "../features/authentication/auth";

export const store = configureStore({
  reducer: {
    auth,
  },
});
