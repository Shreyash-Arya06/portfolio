import React from "react";

import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import style from "./NotFound.module.css";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className={style.page}>
        <div className={style.heading}>404 Not Found</div>
        <div className={style.text}>Bad Request</div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;