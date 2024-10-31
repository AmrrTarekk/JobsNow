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
  data: FinalJobsDataType;
  loading: boolean;
  error: null | string;
};

// const initialState: StateType = {
//   data: {
//     jobs: [],
//     meta: {
//       next: 0,
//       count: 0,
//     },
//   },
//   loading: false,
//   error: null,
// };

type SkillsType = {
  id: string;
};
