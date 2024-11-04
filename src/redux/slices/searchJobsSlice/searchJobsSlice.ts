import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import {
  FinalJobsDataType,
  JobSearchEntity,
  JobType,
  NormalizedJobType,
} from "./type";
import { JobAxios } from "../../../utilities/axiosDefault";
import { RootState } from "../../store";

const jobsSearchAdapter = createEntityAdapter<JobSearchEntity>();

type StateType = {
  data: {
    jobs: ReturnType<typeof jobsSearchAdapter.getInitialState>;
    meta: {
      count: number;
    };
  };
  loading: boolean;
  paginationLoading: boolean;
  error: string | null;
};

const initialState: StateType = {
  data: {
    jobs: jobsSearchAdapter.getInitialState(),
    meta: {
      count: 0,
    },
  },
  loading: false,
  paginationLoading: false,
  error: null,
};

const fetchJobResponse = async (
  query: string,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>
) => {
  const response: any = await JobAxios({
    method: "GET",
    url: `jobs/search?query=${query}`,
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
    Array.from(skillIdsSet).map((id) => dispatch(fetchSkillById(id as string)))
  );
  const detailedSkills = skillsResponses.map(({ payload }) => payload);
  const skillsLookup = detailedSkills.reduce((acc, skill) => {
    acc[skill.id] = skill;
    return acc;
  }, {});

  // final normalization of the jobsData
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
};

export const fetchSearchedJobs = createAsyncThunk(
  "searchJobs/fetchSearchedJobs",
  async (query: string, { dispatch }) => fetchJobResponse(query, dispatch)
);

const fetchSkillById = createAsyncThunk(
  "searchJobs/fetchSkillById",
  async (skillId: string) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/skill/${skillId}`,
    });
    return response.data.data.skill;
  }
);

const searchedJobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSearchedJobs.fulfilled,
        (
          state,
          action: PayloadAction<{ finalJobsData: FinalJobsDataType }>
        ) => {
          jobsSearchAdapter.setAll(
            state.data.jobs,
            action.payload.finalJobsData.jobs
          );
          state.data.meta = action.payload.finalJobsData.meta;
          state.loading = false;
        }
      )
      .addCase(fetchSearchedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  selectAll: selectAllSearchedJobs,
  selectById: selectSearchedJobById,
} = jobsSearchAdapter.getSelectors(
  (state: RootState) => state.searchJobs.data.jobs
);

export const searchedJobsReducer = searchedJobsSlice.reducer;
