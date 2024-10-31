import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchContainer from "./components/SearchContainer";

function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainLayout_header}>
        <Navbar />
        <SearchContainer />
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayout;
