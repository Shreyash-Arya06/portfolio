import React from "react";
import {NavLink, Outlet} from "react-router-dom";

import style from "./AdminLayout.module.css";
import photo from "../../assets/profilepic.png";

const AdminLayout = () => {
  return (
    <>
      <div className={style.page}>
        <div className={style.navbar}>
          <div className={style.topSection}>
            <div className={style.pofileImage}>
              <img src={photo} alt="Profile Photo" />
            </div>
            <div className={style.title}>
              <p>Shreyash Arya</p>
            </div>
          </div>
          <div className={style.optionsSection}>
            <NavLink to="/admin-actions/update-about">
              Update About
            </NavLink>
            <NavLink to="/admin-actions/edit-skills">
              Edit Skills
            </NavLink>
            <NavLink to="/admin-actions/edit-timeline">
              Edit Timeline
            </NavLink>
            <NavLink to="/admin-actions/add-project">
              Add Project
            </NavLink>
            <NavLink to="/admin-actions/edit-project">
              Edit Project
            </NavLink>
            <NavLink to="/admin-actions/manage-library">
              Manage Library
            </NavLink>
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