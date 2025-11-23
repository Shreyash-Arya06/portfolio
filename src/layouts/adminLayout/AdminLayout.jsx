import React, {useState, useRef, useEffect} from "react";
import {NavLink, Outlet, useLocation} from "react-router-dom";

import style from "./AdminLayout.module.css";
import photo from "../../assets/profilepic.png";

const AdminLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const [hoveredPos, setHoveredPos] = useState(null);
  const [activePos, setActivePos] = useState(null);

// refs for sidebar items
  const sidebarRefs = {
    "update-about": useRef(null),
    "edit-skills": useRef(null),
    "edit-timeline": useRef(null),
    "add-project": useRef(null),
    "edit-project": useRef(null),
    "manage-library": useRef(null),
  };

  const debounce = (func, delay = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const updateActivePos = () => {
      const path = location.pathname.replace("/admin-actions/", "");
      const activeElement = sidebarRefs[path]?.current;

      if (activeElement) {
        setActivePos({
          top: activeElement.offsetTop,
          height: activeElement.offsetHeight,
        });
      }
    };

    const debouncedUpdate = debounce(updateActivePos, 80);

    // Run on mount + route change
    updateActivePos();

    // Resize listener
    window.addEventListener("resize", debouncedUpdate);

    // Scroll listener
    const sidebarEl = document.querySelector(`.${style.optionsSection}`);
    if (sidebarEl) {
      sidebarEl.addEventListener("scroll", debouncedUpdate);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      if (sidebarEl) {
        sidebarEl.removeEventListener("scroll", debouncedUpdate);
      }
    };
  }, [location]);


  const handleHover = (key) => {
    const el = sidebarRefs[key].current;
    if (el) {
      setHoveredPos({
        top: el.offsetTop,
        height: el.offsetHeight,
      });
    }
  };

  const handleLeave = () => {
    setHoveredPos(null);
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.navbar}>
          <div className={style.topSection}>
            <div className={style.profileImage}>
              <img src={photo} alt="Profile Photo" />
            </div>
            <div className={style.title}>
              <p>Shreyash</p>
              <p>Arya</p>
            </div>
          </div>
          <div className={isLoggedIn? style.optionsSection : style.optionsSectionDisabled}
               onMouseLeave={handleLeave}>
            <NavLink to="/admin-actions/update-about"
                     ref={sidebarRefs["update-about"]}
                     onMouseEnter={() => handleHover("update-about")}
                     className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}>
              Update About
            </NavLink>
            <NavLink to="/admin-actions/edit-skills"
                     ref={sidebarRefs["edit-skills"]}
                     onMouseEnter={() => handleHover("edit-skills")}
                     className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}>
              Edit Skills
            </NavLink>
            <NavLink to="/admin-actions/edit-timeline"
                     ref={sidebarRefs["edit-timeline"]}
                     onMouseEnter={() => handleHover("edit-timeline")}
                     className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}>
              Edit Timeline
            </NavLink>
            <NavLink to="/admin-actions/add-project"
                     ref={sidebarRefs["add-project"]}
                     onMouseEnter={() => handleHover("add-project")}
                     className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}>
              Add Project
            </NavLink>
            <NavLink to="/admin-actions/edit-project"
                     ref={sidebarRefs["edit-project"]}
                     onMouseEnter={() => handleHover("edit-project")}
                     className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}>
              Edit Project
            </NavLink>
            <NavLink to="/admin-actions/manage-library"
                     ref={sidebarRefs["manage-library"]}
                     onMouseEnter={() => handleHover("manage-library")}
                     className={({ isActive }) => `${!isActive ? style.navOption : style.navOptionActive}`}>
              Manage Library
            </NavLink>
            <div
              className={style.verticalBar}
              style={{
                top: (hoveredPos?.top ?? activePos?.top) + "px",
                height: (hoveredPos?.height ?? activePos?.height) + "px",
              }}
            />
          </div>
          <div className={style.loginSection}>
            {!isLoggedIn ? (
              <NavLink className={style.navOptionActive} onClick={() => setIsLoggedIn(true)}>Login</NavLink>
            ) : (
              <p className={style.navOptionActive} onClick={() => setIsLoggedIn(false)}>Logout</p>
            )}
          </div>

        </div>
        <div className={style.hero}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;