import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  FetchedDetails,
  FinalJobDetailsType,
  JobDetailEntityType,
  NormalizedDetailsType,
  SkillResponseType,
} from "./type";
import { JobAxios } from "../../../utilities/axiosDefault";
import { RootState } from "../../store";

type StateType = {
  data: {
    jobDetails: ReturnType<typeof jobDetailsAdapter.getInitialState>;
  };
  loading: boolean;
  error: string | null;
};

const jobDetailsAdapter = createEntityAdapter<JobDetailEntityType>();

const initialState: StateType = {
  data: {
    jobDetails: jobDetailsAdapter.getInitialState(),
  },
  loading: false,
  error: null,
};

export const fetchJobDetails = createAsyncThunk(
  "jobDetails/fetch",
  async (id: string, { dispatch }) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/job/${id}`,
    });

    const fetchedDetails: FetchedDetails = response.data.data.job;

    const jobDetailsData: NormalizedDetailsType = {
      id: fetchedDetails.id,
      title: fetchedDetails.attributes.title,
      relatedSkillsIds: fetchedDetails.relationships.skills.map((skill) => ({
        id: skill.id,
      })),
    };

    // fetching related skills by id
    const skillsResponses = await Promise.all(
      jobDetailsData.relatedSkillsIds.map((skill) =>
        dispatch(fetchSkillById(skill.id as string))
      )
    );
    const detailedSkills: SkillResponseType[] = skillsResponses.map(
      ({ payload }) => payload
    );

    const skillsByIds = detailedSkills.map((skill) => skill.relationships.jobs);
    const relatedJobsIds = new Set(
      skillsByIds.flatMap((skill) =>
        skill.map((job) => job.id).filter((id) => id !== jobDetailsData.id)
      )
    );

    // fetching related jobs by id
    const relatedJobsResponses = await Promise.all(
      Array.from(relatedJobsIds).map((id) => dispatch(fetchRelatedJobs(id)))
    );

    const relatedJobs: FetchedDetails[] = relatedJobsResponses.map(
      ({ payload }) => payload
    );

    // final normalization of the jobDetailsData
    const finalJobDetailsData: FinalJobDetailsType = {
      id: jobDetailsData.id,
      title: jobDetailsData.title,
      relatedSkills: detailedSkills.map((skill) => ({
        id: skill.id,
        type: skill.type,
        attributes: skill.attributes,
      })),
      relatedJobs: relatedJobs.map((job) => ({
        id: job.id,
        title: job.attributes.title,
      })),
    };

    return { finalJobDetailsData };
  }
);

export const fetchSkillById = createAsyncThunk(
  "jobDetails/fetchSkillById",
  async (skillId: string) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/skill/${skillId}`,
    });
    return response.data.data.skill;
  }
);

export const fetchRelatedJobs = createAsyncThunk(
  "jobDetails/fetchRelatedJobs",
  async (id: string) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/job/${id}`,
    });
    return response.data.data.job;
  }
);

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJobDetails.fulfilled,
        (
          state,
          action: PayloadAction<{ finalJobDetailsData: FinalJobDetailsType }>
        ) => {
          jobDetailsAdapter.setOne(
            state.data.jobDetails,
            action.payload.finalJobDetailsData
          );
          state.loading = false;
        }
      )
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const jobDetailsReducer = jobDetailsSlice.reducer;

export const { selectAll: selectAllJobs, selectById: selectJobById } =
  jobDetailsAdapter.getSelectors(
    (state: RootState) => state.viewJob.data.jobDetails
  );
