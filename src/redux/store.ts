import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import { jobsReducer } from "./slices/jobsSlice/jobsSlice";
import { jobDetailsReducer } from "./slices/jobDetailsSlice/jobDetailsSlice";
import { skillDetailsReducer } from "./slices/skillDetailsSlice/skillDetailsSlice";
import { searchedJobsReducer } from "./slices/searchJobsSlice/searchJobsSlice";
// ...

export const store = configureStore({
  reducer: {
    language: languageSlice,
    jobs: jobsReducer,
    viewJob: jobDetailsReducer,
    viewSkill: skillDetailsReducer,
    searchJobs: searchedJobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
