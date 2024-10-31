import LoadingComp from "../LoadingComponent";

type Props = {
  loading: boolean;
  error: string | null;
  children: any;
};

function PlaceholderPages({ loading, error, children }: Props) {
  return (
    <div>
      {loading && <LoadingComp />}

      {!loading && error && <div>{error}</div>}

      {!loading && !error && <> {children}</>}
    </div>
  );
}

export default PlaceholderPages;
