import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";

import style from "./AdminLayout.module.css";
import photo from "../../assets/profilepic.png";

const AdminLayout = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // on logging out, the menu conditions remains open, so after logging in, menu appears
  const [hoveredPos, setHoveredPos] = useState(null);
  const [activePos, setActivePos] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOptions = [
    "update-about",
    "edit-skills",
    "edit-timeline",
    "add-project",
    "edit-project",
    "manage-library",
  ];

  const sidebarRefs = {
    "update-about": useRef(null),
    "edit-skills": useRef(null),
    "edit-timeline": useRef(null),
    "add-project": useRef(null),
    "edit-project": useRef(null),
    "manage-library": useRef(null),
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    updateActivePos();

    window.addEventListener("resize", debouncedUpdate);

    const sidebarEl = document.querySelector(`.${style.optionsSection}`);
    if (sidebarEl) {
      sidebarEl.addEventListener("scroll", debouncedUpdate);
    }

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

  const menuToggle = () => {
    if (isLoggedIn) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      alert("Login required");
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={style.page}>
        <nav className={style.navbar}>
          <div className={style.topSection}>
            <div className={style.profileImage}>
              <img src={photo} alt="Profile Photo" />
            </div>
            <div className={style.title}>
              <p>Shreyash</p>
              <p>Arya</p>
            </div>
          </div>
          {!isMobileView && (
            <div
              className={
                isLoggedIn ? style.optionsSection : style.optionsSectionDisabled
              }
              onMouseLeave={handleLeave}
            >
              {menuOptions.map((key) => (
                <NavLink
                  key={key}
                  to={`/admin-actions/${key}`}
                  ref={sidebarRefs[key]}
                  onMouseEnter={() => handleHover(key)}
                  className={({ isActive }) =>
                    `${!isActive ? style.navOption : style.navOptionActive}`
                  }
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("-", " ")}
                </NavLink>
              ))}
              <div
                className={style.verticalBar}
                style={{
                  top: (hoveredPos?.top ?? activePos?.top) + "px",
                  height: (hoveredPos?.height ?? activePos?.height) + "px",
                }}
              />
            </div>
          )}

          <div className={style.loginSection}>
            {!isLoggedIn ? (
              <NavLink onClick={() => setIsLoggedIn(true)}>Login</NavLink>
            ) : (
              <p onClick={logOut}>Logout</p>
            )}
          </div>
          {isMobileView && (
            <div className={style.menuOption} onClick={menuToggle}>
              {!isMenuOpen ? <CircleChevronDown /> : <CircleChevronUp />}
            </div>
          )}
        </nav>
        {isMobileView && isLoggedIn && (
          <div className={`${style.menu} ${isMenuOpen ? style.menuOpen : ""}`}>
            {menuOptions.map((key) => (
              <NavLink
                key={key}
                to={`/admin-actions/${key}`}
                ref={sidebarRefs[key]}
                onClick={menuToggle}
                onMouseEnter={() => handleHover(key)}
                className={({ isActive }) =>
                  `${!isActive ? style.navOption : style.navOptionActive}`
                }
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace("-", " ")}
              </NavLink>
            ))}
          </div>
        )}
        <div className={style.hero}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
