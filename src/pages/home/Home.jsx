import React from "react";

import style from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={style.page}>
        <div className={style.topSection}>
          <div className={style.topLeftSection}>
            <div className={style.aboutTitle}>
              <p>Personal Information</p>
            </div>
          </div>
          <div className={style.topRightSection}>
            <div className={style.skillsTitle}>
              <p>Skills</p>
            </div>
          </div>
        </div>
        <div className={style.bottomSection}>
          <div className={style.timelineTitle}>
            <p>Timeline</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;