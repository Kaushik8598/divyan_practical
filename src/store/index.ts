import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/theme/uiSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
