const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "@/lib/features/auth/authSlice";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};
