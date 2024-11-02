import { Link } from "react-router-dom";
import { NormalizedSkillType } from "../../../redux/slices/jobDetailsSlice/type";
import styles from "../styles.module.scss";

type Props = {
  skill: NormalizedSkillType;
};

function SkillCard({ skill }: Props) {
  return (
    <div className={styles.skillCard}>
      <Link to={`/jobs/skill/${skill.id}`}>
        <h5>{skill.attributes.name}</h5>
      </Link>

      <div className={styles.skillCard_details}>
        <div className={styles.spec}>
          <h6>Type:</h6>
          <span>{skill.attributes.type}</span>
        </div>
        <div className={styles.spec}>
          <h6>Importance:</h6>
          <span>{skill.attributes.importance}</span>
        </div>
        <div className={styles.spec}>
          <h6>Level:</h6>
          <span>{skill.attributes.level}</span>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
