import React from "react";

import style from "./Projects.module.css";
import ProjectCard from "../../components/projectCard/ProjectCard.jsx";

const Projects = () => {
  const projects = {
    Project1 : {
      title: "Project 1", // Permit 90 characters only
      tags: ["React", "FastAPI", "Rest api"],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, numquam quo recusandae sed vel veniam vitae voluptates. At, corporis delectus dicta incidunt magni mollitia vitae? Animi, assumenda consequatur cum debitis dolore ducimus eligendi esse hic labore laborum magni minima modi molestias natus numquam obcaecati odit optio possimus quo repellat repellendus rerum sed tempore. Alias aliquid consequuntur dolorem earum ex quisquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi inventore, iure iusto maiores non quibusdam reprehenderit soluta sunt veritatis. Blanditiis facilis fugit incidunt ipsam nesciunt nihil recusandae reiciendis sit!"
    },
    Project2 : {
      title: "Project 2",
      tags: ["React", "FastAPI", "Rest api", "SQL", "Rest api", "SQL", "Rest api", "SQL"],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, numquam quo recusandae sed vel veniam vitae voluptates. At, corporis delectus dicta incidunt magni mollitia vitae? Animi, assumenda consequatur cum debitis dolore ducimus eligendi esse hic labore laborum magni minima modi molestias natus numquam obcaecati odit optio possimus quo repellat repellendus rerum sed tempore. Alias aliquid consequuntur dolorem earum ex quisquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi inventore, iure iusto maiores non quibusdam reprehenderit soluta sunt veritatis. Blanditiis facilis fugit incidunt ipsam nesciunt nihil recusandae reiciendis sit!"
    },
  };

  const projectTitle = [
    "WebDev Projects",
    "Academic Project",
  ];

  return (
    <>
    <div className={style.pageContainer}>
      {projectTitle.map((project) => (
        <div key={project} className={style.projectSection}>
          <div className={style.projectSectionTitle}>
            <p>{project}</p>
          </div>
          <div className={style.projectSectionHero}>
            {Object.entries(projects).map(([key, value]) => (
              <ProjectCard key={key}
                           title={value.title}
                           tags={value.tags}
                           description={value.description}
              />
            ))}
          </div>
        </div>
      ))}
      </div>
    </>
  );
}

export default Projects;