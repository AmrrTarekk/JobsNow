import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.notFoundPage} id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, 404 error!</p>
      <p>
        <i>Not Found</i>
      </p>
      <button className={styles.goBack} onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}
