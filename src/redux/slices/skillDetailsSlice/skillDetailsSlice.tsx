import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  FetchedDetails,
  FinalSkillDetailsDataType,
  JobResponseType,
  NormalizedSkillDetailsType,
  SkillDetailEntityType,
  SkillResponseType,
} from "./type";
import { JobAxios } from "../../../utilities/axiosDefault";
import { RootState } from "../../store";

type StateType = {
  data: {
    skillDetails: ReturnType<typeof skillDetailsAdapter.getInitialState>;
  };
  loading: boolean;
  error: string | null;
};

const skillDetailsAdapter = createEntityAdapter<SkillDetailEntityType>();

const initialState: StateType = {
  data: {
    skillDetails: skillDetailsAdapter.getInitialState(),
  },
  loading: false,
  error: null,
};

export const fetchSkillDetails = createAsyncThunk(
  "skillDetails/fetch",
  async (id: string, { dispatch }) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/skill/${id}`,
    });

    const fetchedDetails: FetchedDetails = response.data.data.skill;

    const skillDetailsData: NormalizedSkillDetailsType = {
      id: fetchedDetails.id,
      attributes: fetchedDetails.attributes,
      relatedJobsIds: fetchedDetails.relationships.jobs.map((job) => ({
        id: job.id,
      })),
      relatedSkillsIds: fetchedDetails.relationships.skills.map((skill) => ({
        id: skill.id,
      })),
    };

    // fetching related jobs by id
    const jobsResponses = await Promise.all(
      skillDetailsData.relatedJobsIds.map((job) =>
        dispatch(fetchRelatedJobs(job.id as string))
      )
    );
    const detailedJobs: JobResponseType[] = jobsResponses.map(
      ({ payload }) => payload
    );

    // fetching related skills by id
    const skillsResponses = await Promise.all(
      skillDetailsData.relatedSkillsIds.map((skill) =>
        dispatch(fetchSkillById(skill.id as string))
      )
    );

    const detailedSkills: SkillResponseType[] = skillsResponses.map(
      ({ payload }) => payload
    );

    const finalSkillDetailsData: FinalSkillDetailsDataType = {
      id: skillDetailsData.id,
      attributes: skillDetailsData.attributes,
      relatedJobs: detailedJobs.map((job) => ({
        id: job.id,
        title: job.attributes.title,
      })),
      relatedSkills: detailedSkills.map((skill) => ({
        id: skill.id,
        name: skill.attributes.name,
      })),
    };

    return { finalSkillDetailsData };
  }
);

export const fetchRelatedJobs = createAsyncThunk(
  "skillDetails/fetchRelatedJobs",
  async (id: string) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/job/${id}`,
    });
    return response.data.data.job;
  }
);

export const fetchSkillById = createAsyncThunk(
  "skillDetails/fetchRelatedSkills",
  async (id: string) => {
    const response: any = await JobAxios({
      method: "GET",
      url: `/skill/${id}`,
    });
    return response.data.data.skill;
  }
);

const skillDetailsSlice = createSlice({
  name: "skillDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkillDetails.fulfilled,
        (
          state,
          action: PayloadAction<{
            finalSkillDetailsData: FinalSkillDetailsDataType;
          }>
        ) => {
          skillDetailsAdapter.setOne(
            state.data.skillDetails,
            action.payload.finalSkillDetailsData
          );
          state.loading = false;
        }
      )
      .addCase(fetchSkillDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const skillDetailsReducer = skillDetailsSlice.reducer;

export const { selectAll: selectAllSkills, selectById: selectSkillById } =
  skillDetailsAdapter.getSelectors(
    (state: RootState) => state.viewSkill.data.skillDetails
  );
