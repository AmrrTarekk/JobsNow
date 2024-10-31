import { ChangeEvent, memo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles.module.scss";

type Props = {
  searchInput: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Search({ handleSearch, searchInput }: Props) {
  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        placeholder="search keyword"
        value={searchInput}
        onChange={handleSearch}
      />
      <SearchIcon className={styles.searchIcon} />
    </div>
  );
}

export default memo(Search);
