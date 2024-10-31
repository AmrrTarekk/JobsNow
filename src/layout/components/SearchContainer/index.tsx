import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { debounce } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "../../../components/Search";

function SearchContainer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchInput = useCallback(
    debounce((query: string) => {
      if (query.length >= 3) {
        navigate(`/jobs/search?id=${query}`, {
          replace: pathname === "/jobs/search" ? true : false,
        });
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
    if (pathname === "/jobs/search") return;
    setSearch("");
  }, [pathname]);

  return (
    <div className={styles.searchBar}>
      <Search searchInput={search} handleSearch={handleSearch} />
    </div>
  );
}

export default SearchContainer;
