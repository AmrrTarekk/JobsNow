type NormalizedJobType = {
  id: string;
  title: string;
  skillIds: string[];
};

type JobType = {
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

type FinalJobsDataType = {
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

type StateType = {
  data: {
    jobs: ReturnType<typeof jobsAdapter.getInitialState>;
    meta: {
      next: number;
      count: number;
    };
  };
  loading: boolean;
  error: null | string;
};

type SkillsType = {
  id: string;
};
