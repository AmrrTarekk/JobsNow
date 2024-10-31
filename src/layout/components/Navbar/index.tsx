import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";

const Tabs = [
  { name: "Home", link: "/jobs" },
  { name: "Search ", link: "/jobs/search" },
  { name: "History", link: "/jobs/search/history" },
];

function Navbar() {
  const { pathname } = useLocation();
  const activeTab = Tabs.findIndex((tab) => tab.link === pathname);

  return (
    <div className={styles.navbar}>
      <p className={styles.navbar_title}>JobsNow</p>
      <div className={styles.navbar_tabs}>
        {Tabs.map((tab, index) => (
          <Link to={tab.link} key={index}>
            <p className={activeTab === index ? styles.activeTab : ""}>
              {tab.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
