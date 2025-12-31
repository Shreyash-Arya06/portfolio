import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";
import style from "./Navbar.module.css";
import profilepic from "../../assets/profilepic.png";

const Navbar = () => {
  const location = useLocation();
  const [hoveredPos, setHoveredPos] = useState(null);
  const [activePos, setActivePos] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOptions = ["home", "projects", "beyond", "resume", "connect-me"];

  const refs = {
    home: useRef(null),
    projects: useRef(null),
    beyond: useRef(null),
    resume: useRef(null),
    "connect-me": useRef(null),
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateUnderlinePosition = () => {
    const activeKey = location.pathname.replace("/", "") || "home";
    const activeElement = refs[activeKey]?.current;

    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      setActivePos({ left: rect.left, width: rect.width });
    }
  };

  useEffect(() => {
    if (!isMobileView) {
      updateUnderlinePosition();
      window.addEventListener("resize", updateUnderlinePosition);
      return () => window.removeEventListener("resize", updateUnderlinePosition);
    }
  }, [location, isMobileView]);

  const handleHover = (key) => {
    const el = refs[key].current;
    if (el) {
      const rect = el.getBoundingClientRect();
      setHoveredPos({ left: rect.left, width: rect.width });
    }
  };

  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLeave = () => {
    setHoveredPos(null);
  };

  if (isMobileView) {
    return (
      <>
        <nav className={style.navbar}>
          <div className={style.leftSection}>
            <div className={style.profilePic}>
              <img src={profilepic} alt="Profile" />
            </div>
            <div className={style.name}>
              <p>Shreyash Arya</p>
            </div>
          </div>
          <div className={style.menuOption} onClick={menuToggle}>
            {!isMenuOpen ? <CircleChevronDown /> : <CircleChevronUp />}
          </div>
        </nav>
        <div className={`${style.menu} ${isMenuOpen ? style.menuOpen : ""}`}>
          {menuOptions.map((key) => (
            <NavLink
              key={key}
              to={`/${key}`}
              className={({ isActive }) =>
                isActive ? style.navOptionActive : style.navOption
              }
              onClick={menuToggle}
            >
              {key.charAt(0).toUpperCase() + key.slice(1).replace("-", " ")}
            </NavLink>
          ))}
        </div>
      </>
    );
  }

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
        {menuOptions.map((key) => (
          <NavLink
            key={key}
            to={`/${key}`}
            ref={refs[key]}
            onMouseEnter={() => handleHover(key)}
            className={({ isActive }) =>
              isActive ? style.navOptionActive : style.navOption
            }
          >
            {key.charAt(0).toUpperCase() + key.slice(1).replace("-", " ")}
          </NavLink>
        ))}
      </div>
      <div
        className={style.underline}
        style={{
          left: (hoveredPos?.left ?? activePos?.left) + "px",
          width: (hoveredPos?.width ?? activePos?.width) + "px",
          opacity: hoveredPos || activePos ? 1 : 0,
        }}
      />
    </nav>
  );
};

export default Navbar;