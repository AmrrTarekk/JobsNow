import { EntityId } from "@reduxjs/toolkit";

export type JobDetailEntityType = {
  id: EntityId;
  title: string;
  relatedSkills: NormalizedSkillType[];
  relatedJobs: {
    id: string;
    title: string;
  }[];
};

export type FetchedDetails = {
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

export type NormalizedDetailsType = {
  id: string;
  title: string;
  relatedSkillsIds: {
    id: EntityId;
  }[];
};

export type SkillResponseType = {
  id: string;
  type: string;
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  relationships: {
    jobs: {
      id: string;
    }[];
    skills: {
      id: string;
    }[];
  };
};

export type NormalizedSkillType = {
  id: string;
  type: string;
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
};

export type FinalJobDetailsType = {
  id: string;
  title: string;
  relatedSkills: NormalizedSkillType[];
  relatedJobs: {
    id: string;
    title: string;
  }[];
};
