import React from "react";
import { useLocation } from "react-router-dom"; // Assuming react-router-dom

import style from "./Footer.module.css";
import insta from "../../assets/insta.svg";
import linkedin from "../../assets/linkedin.svg";
import fable from "../../assets/fable.svg";
import github from "../../assets/github.svg";

const Footer = () => {
  const location = useLocation();
  const isConnectPage = location.pathname === "/connect-me";

  return (
    <footer className={style.footer}>
      <div className={style.leftSection}>
        <p>© {new Date().getFullYear()} Shreyash Arya. All rights reserved.</p>
      </div>
      <div className={`${style.rightSection} ${isConnectPage ? style.hidden : ''}`}>
        
        <div className={style.heading}>
          <p>Socials:</p>
        </div>
        
        <div className={style.icons}>
          <a href="https://github.com/Shreyash-Arya06"> <img src={github} alt="GitHub" /> </a>
          <a href="https://www.linkedin.com/in/shreyash-arya/"> <img src={linkedin} alt="LinkedIn" /> </a>
          <a href="https://www.instagram.com/shreyash.arya16/"> <img src={insta} alt="Instagram" /> </a>
          <a href="https://fable.co/shreyash-283825741495"> <img src={fable} alt="Fable" /> </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;