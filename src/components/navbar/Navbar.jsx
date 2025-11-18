import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import style from "./Navbar.module.css";
import profilepic from "../../assets/profilepic.png";

const Navbar = () => {

  const location = useLocation();
  const [hoveredPos, setHoveredPos] = useState(null);
  const [activePos, setActivePos] = useState(null);

  const refs = {
    home: useRef(null),
    projects: useRef(null),
    beyond: useRef(null),
    resume: useRef(null),
    "connect-me": useRef(null),
  };

  // update active underline position whenever route changes
  useEffect(() => {
    const activeKey = location.pathname.replace("/", "") || "home";
    const activeElement = refs[activeKey]?.current;

    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      setActivePos({ left: rect.left, width: rect.width });
    }
  }, [location]);

  const handleHover = (key) => {
    const el = refs[key].current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setHoveredPos({ left: rect.left, width: rect.width });
    }
  };

  const handleLeave = () => {
    setHoveredPos(null);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.leftSection}>
        <div className={style.profilePic}>
          <img src={profilepic} alt="Profile" />
        </div>
        <div className={style.name}>
          <p>Shreyash Arya</p>
        </div>
      </div>

      <div className={style.rightSection} onMouseLeave={handleLeave}>

        <NavLink to="/home"
                 ref={refs.home}
                 onMouseEnter={() => handleHover("home")}
                 className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}
        >
          Home
        </NavLink>

        <NavLink to="/projects"
                 ref={refs.projects}
                 onMouseEnter={() => handleHover("projects")}
                 className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}
        >
          Projects
        </NavLink>

        <NavLink to="/beyond"
                 ref={refs.beyond}
                 onMouseEnter={() => handleHover("beyond")}
                 className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}
        >
          Beyond
        </NavLink>

        <NavLink to="/resume"
                 ref={refs.resume}
                 onMouseEnter={() => handleHover("resume")}
                 className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}
        >
          Resume
        </NavLink>

        <NavLink to="/connect-me"
                 ref={refs["connect-me"]}
                 onMouseEnter={() => handleHover("connect-me")}
                 className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}
        >
          Connect
        </NavLink>

        {/* the moving underline */}

      </div>
      <div
        className={style.underline}
        style={{
          left: (hoveredPos?.left ?? activePos?.left) + "px",
          width: (hoveredPos?.width ?? activePos?.width) + "px",
        }}
      />
    </nav>
  );
};

export default Navbar;
