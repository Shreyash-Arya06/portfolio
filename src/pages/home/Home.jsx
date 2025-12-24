import React from "react";
import style from "./Home.module.css";

const Home = () => {
  const techSkills = [
    "React", "Framer Motion", "Python", "Node.js", 
    "Advanced SQL", "Web Security", "Git", "CSS Modules"
  ];

  const timelineData = [
    { year: "2019", title: "Class 10th", subtitle: "Secondary Education" },
    { year: "2021", title: "Class 12th", subtitle: "Higher Secondary" },
    { year: "2022", title: "Admission in IIT BHU", subtitle: "Mathematics & Computing" },
    { year: "2026", title: "Intern at Sciforn", subtitle: "Upcoming Summer Intern" }
  ];

  return (
    <div className={style.page}>
      <div className={style.infoSection}>
        <div className={style.aboutTitle}>
          <p>Personal Information</p>
        </div>
        <div className={style.aboutInfo}>
          <p>
            I’m a fourth-year student at IIT BHU, curious about how deep mathematical ideas translate into practical software systems.
          </p>
          <p>
            I like building things on the web—particularly interactive React-based UIs backed by Python or Node.js services and SQL databases. Outside of development, I spend time exploring functional analysis (notably the Hankel transform) and topics in astrophysics and astronomy.
          </p>
        </div>
      </div>

      <div className={style.skillsSection}>
        <div className={style.skillsTitle}>
          <p>Skills</p>
        </div>
        <div className={style.skillContainer}>
          {techSkills.map((skill) => (
            <span key={skill} className={style.pill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className={style.timelineSection}>
        <div className={style.timelineTitle}>
          <p>Timeline</p>
        </div>
        <div className={style.timelineWrapper}>
          {timelineData.map((item, index) => (
            <div key={index} className={style.timelineItem}>
              <div className={style.timelineYear}>{item.year}</div>
              <div className={style.timelineDot}></div>
              <div className={style.timelineContent}>
                <p className={style.eventTitle}>{item.title}</p>
                <p className={style.eventSubtitle}>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;