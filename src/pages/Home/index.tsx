import styles from "./styles.module.scss";
import HelmetContainer from "../../HOC/Helmet";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHook";
import { fetchJobs } from "../../redux/slices/jobsSlice/jobsSlice";

function Home() {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs);

  console.log(jobs, "jobs");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <HelmetContainer title={"All Jobs"}>
      <div className={styles.home}>qweqwe</div>
    </HelmetContainer>
  );
}

export default Home;
