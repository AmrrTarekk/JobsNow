import styles from "./styles.module.scss";
import HelmetContainer from "../../HOC/Helmet";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHook";
import {
  fetchJobs,
  fetchPagination,
  selectAllJobs,
} from "../../redux/slices/jobsSlice/jobsSlice";
import JobCard from "../../components/JobCard";
import PlaceholderPages from "../../components/PlaceholderPages";
import { InView } from "react-intersection-observer";
import { Skeleton } from "@mui/material";

function Home() {
  const dispatch = useAppDispatch();
  const { data, loading, error, paginationLoading } = useAppSelector(
    (state) => state.jobs
  );
  const jobsEntities = useAppSelector((state) => selectAllJobs(state));

  const [cursor, setCursor] = useState(data.meta.next | 0);

  useEffect(() => {
    dispatch(fetchJobs(0));
  }, [dispatch]);

  console.log(data);

  useEffect(() => {
    if (cursor) {
      dispatch(fetchPagination(cursor));
    }
  }, [dispatch, cursor]);

  return (
    <HelmetContainer title={"All Jobs"}>
      <PlaceholderPages loading={loading} error={error}>
        <div className={styles.home}>
          <h1>All Jobs ({data.meta.count})</h1>

          <div className={styles.home_jobs}>
            {jobsEntities.map((job, i) => (
              <Fragment key={job.id}>
                <InView
                  as="div"
                  onChange={(inView) => {
                    return inView &&
                      i === jobsEntities.length - 1 &&
                      cursor < data.meta.count
                      ? setCursor(data.meta.next)
                      : null;
                  }}
                  threshold={0}
                  skip={!data.meta.count}
                >
                  <JobCard job={job} />
                </InView>
              </Fragment>
            ))}

            {paginationLoading &&
              Array.from({ length: 4 })
                .fill("")
                .map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={"150px"}
                    />
                  </div>
                ))}
          </div>
        </div>
      </PlaceholderPages>
    </HelmetContainer>
  );
}

export default Home;
