import React from "react";
import {useNavigate} from "react-router-dom";

import style from "./App.module.css";
import photo from "./assets/landingPhoto.svg";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.app}>
        <div className={style.leftPane}>
          <img src={photo} alt="Shreyash"/>
        </div>

        <div className={style.rightPane}>
          <div className={style.textSection}>
            <div className={style.firstLine}><p>Hi, I'm</p></div>

            {/* Note: &nbsp; is crucial for monospace char counting */}
            <div className={style.name}><p>SHREYASH&nbsp;ARYA</p></div>

            <div className={style.branch}>
              <p>Pre-final year,</p>
              <p>Mathematics and Computing</p>
            </div>
            <div className={style.college}><p>IIT (BHU), Varanasi</p></div>
          </div>

          <div className={style.proceed}>
            <button className={style.proceedButton} onClick={() => navigate("/home")}>
              <span>Get started</span> {/* Wrapped text in span for alignment */}
              <div className={style.btIcon}>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default App;