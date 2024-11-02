import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function DetailsLayout() {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainLayout_header}>
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}

export default DetailsLayout;
