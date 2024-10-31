import { EntityId } from "@reduxjs/toolkit";
import styles from "./styles.module.scss";
import SkillTag from "../SkillTag";
import { Link } from "react-router-dom";

type Props = {
  job: {
    id: EntityId;
    title: string;
    detailedSkill: {
      id: EntityId;
      name: string;
    }[];
  };
};

function JobCard({ job }: Props) {
  return (
    <div className={styles.jobCard}>
      <h3>{job.title}</h3>

      <div className={styles.jobCard_relatedSkills}>
        <h5>Related Skills:</h5>
        <div className={styles.jobCard_relatedSkills_skills}>
          {job.detailedSkill.map((skill) => (
            <SkillTag key={skill.id} name={skill.name} />
          ))}
        </div>
      </div>
      <Link to={`/jobs/job/${job.id}`}>
        <p className={styles.jobCard_footer}>View Job details</p>
      </Link>
    </div>
  );
}

export default JobCard;
