import { EntityId } from "@reduxjs/toolkit";

export type NormalizedJobType = {
  id: string;
  title: string;
  skillIds: string[];
};

export type JobType = {
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: {
      id: string;
    }[];
  };
};

export type FinalJobsDataType = {
  jobs: {
    id: string;
    title: string;
    detailedSkill: {
      id: string;
      name: string;
    }[];
  }[];
  meta: {
    next: number;
    count: number;
  };
};

export type JobEntity = {
  id: EntityId;
  title: string;
  detailedSkill: { id: EntityId; name: string }[];
};

export type StateType = {
  data: {
    jobs: ReturnType<typeof jobsAdapter.getInitialState>;
    meta: {
      next: number;
      count: number;
    };
  };
  loading: boolean;
  paginationLoading: boolean;
  error: string | null;
};
