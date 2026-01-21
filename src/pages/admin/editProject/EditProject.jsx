import React, { useState } from 'react';
import { Plus, Pencil, Trash2, EyeOff, Eye, CircleArrowDown, CircleArrowUp } from 'lucide-react';

import style from "./EditProject.module.css";

const EditProject = () => {
  const [showModal, setShowModal] = useState(false);

  const baseData = [
    {
      title: "Project 1", // Permit 90 characters only
      tags: ["React", "FastAPI", "Rest api"],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, numquam quo recusandae sed vel veniam vitae voluptates. At, corporis delectus dicta incidunt magni mollitia vitae? Animi, assumenda consequatur cum debitis dolore ducimus eligendi esse hic labore laborum magni minima modi molestias natus numquam obcaecati odit optio possimus quo repellat repellendus rerum sed tempore. Alias aliquid consequuntur dolorem earum ex quisquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi inventore, iure iusto maiores non quibusdam reprehenderit soluta sunt veritatis. Blanditiis facilis fugit incidunt ipsam nesciunt nihil recusandae reiciendis sit!"
    },
    {
      title: "Project 2",
      tags: ["React", "FastAPI", "Rest api", "SQL", "Rest api", "SQL", "Rest api", "SQL"],
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, numquam quo recusandae sed vel veniam vitae voluptates. At, corporis delectus dicta incidunt magni mollitia vitae? Animi, assumenda consequatur cum debitis dolore ducimus eligendi esse hic labore laborum magni minima modi molestias natus numquam obcaecati odit optio possimus quo repellat repellendus rerum sed tempore. Alias aliquid consequuntur dolorem earum ex quisquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad commodi inventore, iure iusto maiores non quibusdam reprehenderit soluta sunt veritatis. Blanditiis facilis fugit incidunt ipsam nesciunt nihil recusandae reiciendis sit!"
    },
  ];

  const dummyData = [...baseData, ...baseData, ...baseData].map((item, index) => ({
    ...item,
    id: index
  }));

  return (
    <div className={style.page}>
      {/* {showModal && (<div></div>)} */}
      <div className={style.hero}>
        <div className={style.headerRow}> 
          <div className={style.addSection}>
            <Plus size={20} />
            <p>Edit Categories</p>
          </div>
        </div>
        <div className={style.addedProjects}>
          <div className={style.tableArea}>
            <table>
              <thead>
                <tr>
                  <th className={style.colSr}>Sr. No.</th>
                  <th className={style.colTitle}>Title</th>
                  <th className={style.colAction}>Actions</th>
                  <th className={style.colReorder}>Reorder</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((project, index) => (
                  <tr key={project.id}>
                    <td className={style.srNo}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                    <td>
                      <div className={style.projectTitle}>
                        <p>{project.title}</p>
                      </div>
                    </td>
                    <td>
                      <div className={style.actionButtons}>
                        <button className={style.editBtn} title="Edit" >
                          <Pencil size={18} />
                        </button>
                        <button className={style.hideBtn} title="Hide">
                          <Eye size={18} />
                        </button>
                        <button className={style.deleteBtn} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className={style.reorderButtons}>
                        <button className={style.reorderBtn} title="Move Up">
                          <CircleArrowUp  size={18} />
                        </button>
                        <button className={style.reorderBtn}>
                          <CircleArrowDown size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={style.a}></div>
    </div>
  );
}

export default EditProject;