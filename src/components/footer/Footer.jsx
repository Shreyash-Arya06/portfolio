import React from "react";

import style from "./Footer.module.css";
import insta from "../../assets/insta.svg";
import linkedin from "../../assets/linkedin.svg";
import book from "../../assets/book.svg";
import github from "../../assets/github.svg";
const Footer = () => {
  return (
    <>
      <footer className={style.footer}>
        <div className={style.leftSection}>
          <p>© {new Date().getFullYear()} Shreyash Arya. All rights reserved.</p>
        </div>
        <div className={style.rightSection}>
          <div className={style.heading}>
            <p>Socials:</p>
          </div>
          <div className={style.icons}>
            <a href="https://github.com/Shreyash-Arya06"> <img src={github} alt="GitHub" /> </a>
            <a href="https://www.linkedin.com/in/shreyash-arya/"> <img src={linkedin} alt="LinkedIn" /> </a>
            <img src={insta} alt="Instagram" />
            <img src={book} alt="Fabble" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;