import React from "react";

import style from "./ProjectCard.module.css";
import image from "../../assets/web1.png";

const ProjectCard = (props) => {

  return (
    <>
      <div className={style.container}>
        <div className={style.containerImg}>
          <img src={image} />
        </div>
        <div className={style.title}>
          <p>{props.title}</p>
        </div>
        <div className={style.tagContainer}>
          {props.tags.map((key) => (
            <span className={style.tag} key={key}>{key}</span>
          ))}
        </div>
        <div className={style.description}>
          <p>{props.description}</p>
        </div>
        <div className={style.readMoreBtn}>
          <button>Read More</button>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;