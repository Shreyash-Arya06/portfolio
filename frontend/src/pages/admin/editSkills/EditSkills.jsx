import React, { useState } from "react";
import { CircleArrowDown, CircleArrowUp, Plus, CircleX, Save, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

import style from "./EditSkills.module.css";

const EditSkills = () => {
  const initialData = [
    "DSA", "Operating Systems", "Full Stack Web Development",
    "C++", "C#", "React", "C++1", "C#1", "React1",
    "C++2", "C#2", "React2", "C++3", "C#3", "React3",
  ];

  const [skills, setSkills] = useState(initialData);
  const [originalSkills, setOriginalSkills] = useState(initialData);
  const [isOrderChanged, setIsOrderChanged] = useState(false);

  const checkIfOrderChanged = (currentList) => {
    const isDifferent = JSON.stringify(currentList) !== JSON.stringify(originalSkills);
    setIsOrderChanged(isDifferent);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newSkills = [...skills];
    [newSkills[index], newSkills[index - 1]] = [newSkills[index - 1], newSkills[index]];
    setSkills(newSkills);
    checkIfOrderChanged(newSkills);
  };

  const moveDown = (index) => {
    if (index === skills.length - 1) return;
    const newSkills = [...skills];
    [newSkills[index], newSkills[index + 1]] = [newSkills[index + 1], newSkills[index]];
    setSkills(newSkills);
    checkIfOrderChanged(newSkills);
  };

  const handleDelete = (indexToDelete) => {
    const updatedList = skills.filter((_, index) => index !== indexToDelete);
    setSkills(updatedList);
    setOriginalSkills(updatedList);
    setIsOrderChanged(false);
  };

  const handleReset = () => {
    setSkills(originalSkills);
    setIsOrderChanged(false);
  };

  const handleSave = () => {
    console.log("Saving to DB:", skills);
    setOriginalSkills(skills);
    setIsOrderChanged(false);
  };

  return (
    <div className={style.page}>
      <div className={style.hero}>
        <div className={style.headerRow}>
            <div className={style.title}>
                <p>Manage Skills</p>
            </div>
            <div className={style.addSkillBtn}>
                <Plus size={18}/>
                <p>Add New</p>
            </div>
        </div>
        <div className={style.tableContainer}>
          <div className={style.tableArea}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.colSr}>Sr.</th>
                  <th className={style.colSkill}>Skill Name</th>
                  <th className={style.colAction}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, index) => (
                  <motion.tr 
                    key={skill}
                    layout // This enables the smooth reorder animation
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={style.tableRow}
                  >
                    <td className={style.srNo}>
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </td>
                    <td className={style.skillName}>
                      {skill}
                    </td>
                    <td>
                      <div className={style.actionButtons}>
                        <button 
                          className={style.reorderBtn} 
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          title="Move Up"
                        >
                          <CircleArrowUp size={20} />
                        </button>
                        
                        <button 
                          className={style.reorderBtn} 
                          onClick={() => moveDown(index)}
                          disabled={index === skills.length - 1}
                          title="Move Down"
                        >
                          <CircleArrowDown size={20} />
                        </button>

                        <button 
                          className={style.deleteBtn} 
                          onClick={() => handleDelete(index)}
                          title="Delete"
                        >
                          <CircleX size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {skills.length === 0 && (
                    <tr>
                        <td colSpan="3" className={style.emptyState}>No skills added yet.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isOrderChanged && (
            <motion.div 
                className={style.footerActions}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <button className={style.resetBtn} onClick={handleReset}>
                    <RotateCcw size={16} />
                    Reset Order
                </button>
                <button className={style.saveBtn} onClick={handleSave}>
                    <Save size={16} />
                    Save Changes
                </button>
            </motion.div>
        )}

      </div>
    </div>
  );
};

export default EditSkills;