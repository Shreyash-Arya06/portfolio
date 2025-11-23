import React, {useState, useRef, useEffect} from "react";
import {NavLink, useLocation} from "react-router-dom";

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

  const debounce = (func, delay = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const updateUnderlinePosition = () => {
    const activeKey = location.pathname.replace("/", "") || "home";
    const activeElement = refs[activeKey]?.current;

    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      setActivePos({left: rect.left, width: rect.width});
    }
  };

  useEffect(() => {
    updateUnderlinePosition();

    const debouncedUpdate = debounce(updateUnderlinePosition, 50);

    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [location]);

  const handleHover = (key) => {
    const el = refs[key].current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setHoveredPos({left: rect.left, width: rect.width});
    }
  };

  const handleLeave = () => {
    setHoveredPos(null);
  };

  return (
    <nav className={style.navbar}>
      <div className={style.leftSection}>
        <div className={style.profilePic}>
          <img src={profilepic} alt="Profile"/>
        </div>
        <div className={style.name}>
          <p>Shreyash Arya</p>
        </div>
      </div>

      <div className={style.rightSection} onMouseLeave={handleLeave}>
        {["home", "projects", "beyond", "resume", "connect-me"].map((key) => (
          <NavLink
            key={key}
            to={`/${key}`}
            ref={refs[key]}
            onMouseEnter={() => handleHover(key)}
            className={({isActive}) =>
              isActive ? style.navOptionActive : style.navOption
            }
          >
            {key.charAt(0).toUpperCase() + key.slice(1).replace("-", " ")}
          </NavLink>
        ))}
      </div>
      <div className={style.underline}
           style={{
             left: (hoveredPos?.left ?? activePos?.left) + "px",
             width: (hoveredPos?.width ?? activePos?.width) + "px",
             opacity: (hoveredPos || activePos) ? 1 : 0,
           }}/>
    </nav>
  );
};

export default Navbar;