import styles from "./styles.module.scss";

export default function ErrorPage() {
  return (
    <div className={styles.notFoundPage} id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, 404 error!</p>
      <p>
        <i>Not Found</i>
      </p>
    </div>
  );
}
