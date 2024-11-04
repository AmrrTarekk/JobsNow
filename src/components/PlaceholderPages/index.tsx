import LoadingComp from "../LoadingComponent";
import styles from "./styles.module.scss";
type Props = {
  loading: boolean;
  error: string | null;
  children: any;
};

function PlaceholderPages({ loading, error, children }: Props) {
  return (
    <div>
      {loading && <LoadingComp />}

      {!loading && error && <div className={styles.error}>{error}</div>}

      {!loading && !error && <> {children}</>}
    </div>
  );
}

export default PlaceholderPages;
