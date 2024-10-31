import styles from "./styles.module.scss";
import HelmetContainer from "../../HOC/Helmet";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHook";
import {
  fetchJobs,
  selectAllJobs,
} from "../../redux/slices/jobsSlice/jobsSlice";

function Home() {
  const dispatch = useAppDispatch();
  const { jobs: jobsState } = useAppSelector((state) => state);
  const jobs = useAppSelector((state) => selectAllJobs(state));

  console.log(jobsState, "jobs");

  useEffect(() => {
    dispatch(fetchJobs(0));
  }, [dispatch]);

  return (
    <HelmetContainer title={"All Jobs"}>
      <div className={styles.home}>qweqwe</div>
    </HelmetContainer>
  );
}

export default Home;
