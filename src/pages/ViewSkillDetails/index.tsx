import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHook";
import { useEffect } from "react";
import {
  fetchSkillDetails,
  selectSkillById,
} from "../../redux/slices/skillDetailsSlice/skillDetailsSlice";
import HelmetContainer from "../../HOC/Helmet";
import PlaceholderPages from "../../components/PlaceholderPages";
import JobDetailsCard from "./JobDetailsCard";

function ViewSkillDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.viewSkill);
  const viewSkill = useAppSelector((state) =>
    selectSkillById(state, id as string)
  );
  useEffect(() => {
    dispatch(fetchSkillDetails(id as string));
  }, [dispatch, id]);

  return (
    <HelmetContainer title={viewSkill?.attributes.name || "Skill Details"}>
      <PlaceholderPages loading={loading} error={error}>
        <div className={styles.viewSkill}>
          <h1>{viewSkill?.attributes.name}</h1>

          <div className={styles.viewSkillLayout}>
            <div className={styles.viewSkillLayout_relatedJobs}>
              <h3>Related Jobs:</h3>

              <div className={styles.jobs}>
                {viewSkill?.relatedJobs.map((job) => (
                  <JobDetailsCard
                    key={job.id}
                    job={job}
                    attributes={viewSkill?.attributes}
                  />
                ))}
              </div>
            </div>

            <div className={styles.viewSkillLayout_relatedSkills}>
              <h3>Related Skills:</h3>

              <div className={styles.skills}>
                {viewSkill?.relatedSkills.map((skill) => (
                  <Link key={skill.id} to={`/jobs/skill/${skill.id}`}>
                    <li>
                      <span>{skill.name}</span>
                    </li>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PlaceholderPages>
    </HelmetContainer>
  );
}

export default ViewSkillDetails;
