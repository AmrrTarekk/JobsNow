import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHook";
import {
  fetchJobDetails,
  selectJobById,
} from "../../redux/slices/jobDetailsSlice/jobDetailsSlice";
import { Link, useParams } from "react-router-dom";
import PlaceholderPages from "../../components/PlaceholderPages";
import HelmetContainer from "../../HOC/Helmet";
import styles from "./styles.module.scss";
import SkillCard from "./SkillCard";

function ViewJobDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const viewJob = useAppSelector((state) => selectJobById(state, id as string));
  const { loading, error } = useAppSelector((state) => state.viewJob);

  useEffect(() => {
    dispatch(fetchJobDetails(id as string));
  }, [dispatch, id]);

  return (
    <HelmetContainer title={viewJob?.title || "Job Details"}>
      <PlaceholderPages loading={loading} error={error}>
        <div className={styles.viewJob}>
          <h1>{viewJob?.title}</h1>

          <div className={styles.viewJobLayout}>
            <div className={styles.viewJobLayout_relatedSkills}>
              <h3>Related Skills:</h3>

              <div className={styles.skills}>
                {viewJob?.relatedSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>

            <div className={styles.viewJobLayout_relatedJobs}>
              <h3>Related Jobs:</h3>

              <div className={styles.jobs}>
                {viewJob?.relatedJobs.map((job) => (
                  <Link key={job.id} to={`/jobs/job/${job.id}`}>
                    <li>
                      <span>{job.title}</span>
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

export default ViewJobDetails;
