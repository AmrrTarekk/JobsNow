export type JobSearchEntity = {
  id: EntityId;
  title: string;
  detailedSkill: { id: EntityId; name: string }[];
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

export type NormalizedJobType = {
  id: string;
  title: string;
  skillIds: string[];
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
    count: number;
  };
};
