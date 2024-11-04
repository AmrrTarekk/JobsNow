import { ChangeEvent, memo, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.scss";
import { useAppSelector } from "../../redux/hook/reduxHook";
import { selectAllSearchedJobs } from "../../redux/slices/searchJobsSlice/searchJobsSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
type Props = {
  searchInput: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

type searchHistory = {
  id: string;
  title: string;
};

function Search({ handleSearch, searchInput }: Props) {
  const [searchFocus, setSearchFocus] = useState(false);
  const searchedJobs = useAppSelector((state) => selectAllSearchedJobs(state));
  const { loading } = useAppSelector((state) => state.searchJobs);

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

  useEffect(() => {
    const focusListener = () => {
      setSearchFocus(false);
    };
    document.body.addEventListener("click", focusListener);

    return () => document.body.removeEventListener("click", focusListener);
  }, []);
  return (
    <div className={`${styles.searchBox}`}>
      <div
        className={` ${searchFocus && styles.searchBoxActive}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="search keyword"
            value={searchInput}
            onChange={handleSearch}
            onFocus={() => setSearchFocus(true)}
          />
          <SearchIcon className={styles.searchIcon} />
        </div>
      </div>
      {searchFocus && (
        <div className={styles.searchMenu}>
          {loading ? (
            <div className={styles.loading}>
              <div></div>
            </div>
          ) : (
            searchedJobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/job/${job.id}`}
                onClick={() =>
                  handleSearchHistory({ id: `${job.id}`, title: job.title })
                }
              >
                <div className={styles.searchMenuRow}>
                  <AccessTimeIcon />
                  <p>{job.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default memo(Search);
