import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { debounce } from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Search from "../../../components/Search";
import axiosDefault from "../../../utilities/axiosDefault/createDefault";

function SearchContainer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [search, setSearch] = useState(query || "");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [results, setResults] = useState<any>();

  console.log(query);

  const getSearchRes = useCallback(
    (controller: AbortController) => {
      if (search) {
        axiosDefault
          .get(`/jobs/search?query=${search}`, {
            signal: controller.signal,
          })
          .then(({ data }) => {
            setResults(data.data);
            setShowAutocomplete(true);
          })
          .catch((err) => {
            console.log(err);
            setShowAutocomplete(false);
          });
      }
    },
    [search]
  );
  console.log(results);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchInput = useCallback(
    debounce((query: string) => {
      if (query.length >= 3) {
        navigate(`/jobs/search?query=${query}`, {
          replace: pathname === "/jobs/search" ? true : false,
        });
        getSearchRes(new AbortController());
      } else if (query.length === 0) {
        navigate("/jobs");
        setResults({});
        setShowAutocomplete(false);
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
    getSearchRes(new AbortController());
  }, [getSearchRes]);

  useEffect(() => {
    if (pathname === "/jobs/search") return;
    setSearch("");
  }, [pathname]);

  return (
    <>
      <div className={styles.searchBar}>
        <Search searchInput={search} handleSearch={handleSearch} />
      </div>
      <div>
        {showAutocomplete && results?.jobs.length > 0 && (
          <ul className="">
            {results.jobs.map((job: any) => (
              <Link to={`/jobs/job/${job.id}`} key={job.id}>
                <li
                  style={{ color: "black" }}
                  key={job.id}
                  // onClick={() => handleSelectSuggestion(job.title)}
                  className="autocomplete-item"
                >
                  {job.attributes.title}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SearchContainer;
