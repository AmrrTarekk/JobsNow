import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { debounce } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Search from "../../../components/Search";
import { fetchSearchedJobs } from "../../../redux/slices/searchJobsSlice/searchJobsSlice";
import { useAppDispatch } from "../../../redux/hook/reduxHook";

function SearchContainer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [search, setSearch] = useState(query || "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchInput = useCallback(
    debounce((query: string) => {
      if (query.length >= 3) {
        navigate(`/jobs/search?query=${query}`, {
          replace: pathname === "/jobs/search" ? true : false,
        });
      } else if (query.length === 0) {
        navigate("/jobs");
        dispatch(fetchSearchedJobs(null as any));
      }
    }, 500),
    []
  );
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debounceSearchInput(value);
  };

  useEffect(() => {
    if (pathname === "/jobs/search" && !query) setSearch("");
  }, [pathname, query]);

  return (
    <div className={styles.searchBar}>
      <Search searchInput={search} handleSearch={handleSearch} />
    </div>
  );
}

export default SearchContainer;
