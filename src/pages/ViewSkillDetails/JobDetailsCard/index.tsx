import { Link } from "react-router-dom";
import styles from "../styles.module.scss";
type Props = {
  job: { id: string; title: string };
  attributes: {
    name: string;
    type: string;
    importance: string;
    level: string;
  };
};

function JobDetailsCard({ job, attributes }: Props) {
  return (
    <div className={styles.jobCard}>
      <Link to={`/jobs/job/${job.id}`}>
        <h5>{job.title}</h5>
      </Link>

      <div className={styles.jobCard_details}>
        <div className={styles.spec}>
          <h6>Type:</h6>
          <span>{attributes.type}</span>
        </div>
        <div className={styles.spec}>
          <h6>Importance:</h6>
          <span>{attributes.importance}</span>
        </div>
        <div className={styles.spec}>
          <h6>Level:</h6>
          <span>{attributes.level}</span>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsCard;
