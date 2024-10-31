import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import { jobsReducer } from "./slices/jobsSlice/jobsSlice";
// ...

export const store = configureStore({
  reducer: {
    language: languageSlice,
    jobs: jobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
