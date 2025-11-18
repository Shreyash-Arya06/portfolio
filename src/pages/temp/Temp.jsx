import React from "react";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";

import style from "./Temp.module.css";
import profile from "../../assets/photo.png";

function Temp() {
  const navigate = useNavigate();

  return (
    <div className={style.landing_container}>
      {/* Background gradient + floating blobs */}
      <div className={style.gradient_bg}></div>

      <div className={style.landing_card}>
        <div className={style.photo_section}>
          <img src={profile} alt="Shreyash Arya" className={style.profile_img} />
        </div>

        <div className={style.intro_section}>
          <motion.h1 initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
            Hi, I'm <span>Shreyash Arya</span>
          </motion.h1>

          <p className={style.intro_subtext}>
            Pre-final year, <br />
            <span>Mathematics and Computing</span> <br />
            IIT (BHU), Varanasi
          </p>

          <p className={style.intro_tagline}>
            Exploring the intersection of Mathematics, Computing, and AI.
          </p>

          <button className={style.get_started} onClick={() => navigate("/home")}>
            Get Started
            <span className={style.arrow}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Temp
