import { EntityId } from "@reduxjs/toolkit";

export type SkillDetailEntityType = {
  id: EntityId;
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  relatedJobs: {
    id: string;
    title: string;
  }[];
  relatedSkills: {
    id: string;
    name: string;
  }[];
};

export type FetchedDetails = {
  id: string;
  type: string;
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  relationships: {
    skills: {
      id: string;
    }[];
    jobs: {
      id: string;
    }[];
  };
};

export type NormalizedSkillDetailsType = {
  id: string;
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  relatedJobsIds: {
    id: EntityId;
  }[];
  relatedSkillsIds: {
    id: EntityId;
  }[];
};

export type JobResponseType = {
  id: string;
  attributes: {
    title: string;
  };
  type: string;
  relationships: {
    skills: {
      id: string;
    }[];
  };
};

export type SkillResponseType = NormalizedSkillDetailsType;

export type FinalSkillDetailsDataType = {
  id: string;
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
  relatedJobs: {
    id: string;
    title: string;
  }[];
  relatedSkills: {
    id: string;
    name: string;
  }[];
};
