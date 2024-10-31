import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { JobAxios } from "../../../utilitiestest/axiosDefault";
import { RootState } from "../../store";

const jobsAdapter = createEntityAdapter();

const initialState: StateType = {
  data: {
    jobs: jobsAdapter.getInitialState(),
    meta: {
      next: 0,
      count: 0,
    },
  },
  loading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (next: number, { dispatch }) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/jobs?cursor=${next}&limit=12`,
    });

    const fetchedJobsData: JobType[] = response.data.data.jobs;
    const meta = response.data.data.meta;

    const jobsData: NormalizedJobType[] = fetchedJobsData.map((job) => ({
      id: job.id,
      title: job.attributes.title,
      skillIds: job.relationships.skills.map((skill) => skill.id),
    }));

    const skillIdsSet = new Set(jobsData.flatMap((job) => job.skillIds));

    const skillsResponses = await Promise.all(
      Array.from(skillIdsSet).map((id) =>
        dispatch(fetchSkillById(id as string))
      )
    );

    const detailedSkills = skillsResponses.map(({ payload }) => payload);
    const skillsLookup = detailedSkills.reduce((acc, skill) => {
      acc[skill.id] = skill;
      return acc;
    }, {});

    // Normalize the jobs data by adding detailed skills info
    const finalJobsData = {
      jobs: jobsData.map(({ id, title, skillIds }) => ({
        id,
        title,
        detailedSkill: skillIds.map((skillId) => ({
          id: skillsLookup[skillId].id,
          name: skillsLookup[skillId].attributes.name,
        })),
      })),
      meta,
    };

    return { finalJobsData };
  }
);

const fetchSkillById = createAsyncThunk(
  "skills/fetchSkillById",
  async (skillId: string) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/skill/${skillId}`,
    });
    return response.data.data.skill;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJobs.fulfilled,
        (
          state,
          action: PayloadAction<{ finalJobsData: FinalJobsDataType }>
        ) => {
          jobsAdapter.setAll(
            state.data.jobs,
            action.payload.finalJobsData.jobs
          );
          state.data.meta = action.payload.finalJobsData.meta;
          state.loading = false;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { selectAll: selectAllJobs, selectById: selectJobById } =
  jobsAdapter.getSelectors((state: RootState) => state.jobs.data.jobs);

export const jobsReducer = jobsSlice.reducer;
