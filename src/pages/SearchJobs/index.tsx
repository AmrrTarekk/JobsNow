import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hook/reduxHook";
import {
  fetchSearchedJobs,
  selectAllSearchedJobs,
} from "../../redux/slices/searchJobsSlice/searchJobsSlice";
import HelmetContainer from "../../HOC/Helmet";
import PlaceholderPages from "../../components/PlaceholderPages";
import JobCard from "../../components/JobCard";

type searchHistory = {
  id: string;
  title: string;
};

function SearchJobs() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.searchJobs);

  const [searchHistory, setSearchHistory] = useState<searchHistory[]>(
    JSON.parse(localStorage?.getItem("searchHistory") || "[]")
  );

  const handleSearchHistory = (job: { id: string; title: string }) => {
    if (searchHistory.length) {
      localStorage?.setItem(
        "searchHistory",
        JSON.stringify([
          job,
          ...JSON.parse(localStorage?.getItem("searchHistory") || "[]").filter(
            (item: searchHistory) => item.id !== job.id
          ),
        ])
      );
      setSearchHistory([
        job,
        ...JSON.parse(localStorage?.getItem("searchHistory") || "[]").filter(
          (item: searchHistory) => item.id !== job.id
        ),
      ]);
    } else {
      localStorage?.setItem("searchHistory", JSON.stringify([job]));
      setSearchHistory([job]);
    }
  };

  const searchedJobsEntities = useAppSelector((state) =>
    selectAllSearchedJobs(state)
  );
  useEffect(() => {
    dispatch(fetchSearchedJobs(query as string));
  }, [dispatch, query]);

  return (
    <HelmetContainer title={`Search Jobs: ${query}`}>
      <PlaceholderPages loading={loading} error={error}>
        <div className={styles.searchPage}>
          {!!query?.length && (
            <h1>
              “{query}” jobs ({data.meta.count})
            </h1>
          )}
          <div className={styles.searchPageLayout}>
            {query?.length ? (
              <div className={styles.searchPageLayout_jobs}>
                {searchedJobsEntities.length > 0 ? (
                  searchedJobsEntities.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      handleSearchHistory={handleSearchHistory}
                    />
                  ))
                ) : (
                  <h3>No jobs found...</h3>
                )}
              </div>
            ) : (
              <h2>Type a keyword to search for jobs</h2>
            )}
            <div className={styles.searchPageLayout_searchHistory}>
              <h3>Search History:</h3>

              <div className={styles.jobs}>
                {searchHistory.length ? (
                  searchHistory.map((job) => (
                    <Link key={job.id} to={`/jobs/job/${job.id}`}>
                      <li>
                        <span>{job.title}</span>
                      </li>
                    </Link>
                  ))
                ) : (
                  <h4>No search history yet!</h4>
                )}
              </div>
            </div>
          </div>
        </div>
      </PlaceholderPages>
    </HelmetContainer>
  );
}

export default SearchJobs;
