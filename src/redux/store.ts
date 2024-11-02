import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import { jobsReducer } from "./slices/jobsSlice/jobsSlice";
import { jobDetailsReducer } from "./slices/jobDetailsSlice/jobDetailsSlice";
import { skillDetailsReducer } from "./slices/skillDetailsSlice/skillDetailsSlice";
// ...

export const store = configureStore({
  reducer: {
    language: languageSlice,
    jobs: jobsReducer,
    viewJob: jobDetailsReducer,
    viewSkill: skillDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
