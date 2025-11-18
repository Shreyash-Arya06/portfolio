import React from "react";
import {Outlet} from "react-router-dom";

import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";

import style from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className={style.main}>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}

export default MainLayout;