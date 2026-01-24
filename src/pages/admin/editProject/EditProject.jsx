import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, EyeOff, Eye, CircleArrowDown, CircleArrowUp } from 'lucide-react';

import style from "./EditProject.module.css";

const EditProject = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, addToCategories] = useState([
    "Web Dev", "Academic", "temp"
  ]);

  const baseData = [
    {
      category: "Web Dev",
      title: "Project 1", 
      tags: ["React", "FastAPI", "Rest api"],
      description: "Lorem ipsum..."
    },
    {
      category: "Academic",
      title: "Project 2",
      tags: ["React..."],
      description: "Lorem ipsum..."
    },
  ];

  const dummyData = [...baseData, ...baseData, ...baseData].map((item, index) => ({
    ...item,
    id: index
  }));

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = useMemo(() => {
    console.log("Filtering huge list...");
    return dummyData.filter(p => !selectedCategory || p.category === selectedCategory);
  }, [selectedCategory, dummyData]);

  return (
    <div className={style.page}>
      <div className={style.hero}>
        <div className={style.addedProjects}>
          <div className={style.tableHeader}>
            <div className={style.title}>
              <p>Existing Projects</p>
            </div>
            <div className={style.selectSection}>
              <p>Category: </p>
              <select 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                className={style.categorySelect}
              >
                <option value="">---Select Category---</option>
                {categories.map((categoryName, index) => (
                  <option value={categoryName} key={index}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={style.tableArea}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.colSr}>Sr. No.</th>
                  <th className={style.colTitle}>Title</th>
                  <th className={style.colAction}>Actions</th>
                  {selectedCategory && (<th className={style.colReorder}>Reorder</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((project, index) => (
                  <tr key={project.id}>
                    <td className={style.srNo}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </td>
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
                    {selectedCategory && (
                      <td>
                        <div className={style.reorderButtons}>
                          <button className={style.reorderBtn} title="Move Up">
                            <CircleArrowUp  size={22} />
                          </button>
                          <button className={style.reorderBtn}>
                            <CircleArrowDown size={22} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                      No projects found in this category.
                    </td>
                  </tr>
                )}
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