import React from "react";

import Navbar from "../../components/navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import style from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={style.page}>
      <Navbar />
      <div className={style.heading}>404 Not Found</div>
      <div className={style.text}>Bad Request</div>
      <Footer />
    </div>
  );
}

export default NotFound;