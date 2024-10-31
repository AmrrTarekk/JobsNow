import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobAxios } from "../../../utilitiestest/axiosDefault";

type NormalizedDataType = {
  jobs: NormalizedJobType[];
  meta: {
    next: number;
    count: number;
  };
};

const initialState: StateType = {
  data: {
    jobs: [],
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
  async (_, { dispatch }) => {
    const response: any = await JobAxios({
      method: "GET",
      url: "/jobs",
    });

    const fetchedJobsData: JobType[] = response.data.data.jobs;
    const meta = response.data.data.meta;

    const jobsData: NormalizedDataType = {
      jobs: [],
      meta,
    };

    fetchedJobsData.forEach((job) => {
      const {
        id,
        attributes: { title },
        relationships: { skills },
      } = job;

      jobsData.jobs.push({
        id,
        title,
        skillIds: skills.map((skill) => skill.id),
      });
    });

    const skillIdsSet = new Set(jobsData.jobs.flatMap((job) => job.skillIds));

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

    const finalJobsData = {
      ...jobsData,
      jobs: jobsData.jobs.map(({ id, title, skillIds }) => ({
        id,
        title,
        detailedSkill: skillIds.map((skillId) => ({
          id: skillsLookup[skillId].id,
          name: skillsLookup[skillId].attributes.name,
        })),
      })),
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
          state.data = action.payload.finalJobsData;
          state.loading = false;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const jobsReducer = jobsSlice.reducer;
