import React, { useState } from "react";
import { CircleArrowDown, CircleArrowUp, Plus, CircleX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import style from "./EditSkills.module.css";

const EditSkills = () => {
  const initialData = [
    "DSA",
    "Operating Systems",
    "Full Stack Web Development",
    "C++",
    "C#",
    "React",
    "C++1",
    "C#1",
    "React1",
    "C++2",
    "C#2",
    "React2",
    "C++3",
    "C#3",
    "React3",
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
      {/* Function to add skills remains */}
      <div className={style.addSkills}>
        <Plus />
        <p>Add Skills</p>
      </div>
      <div className={style.currentSkills}>
        <div className={style.title}>
          <p>Current Skills</p>
        </div>
        <div className={style.skillsList}>
          {/* AnimatePresence allows animating items as they are removed */}
          <AnimatePresence initial={false} mode="popLayout">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className={style.skillTag}
              >
                <div className={style.skillName}>
                  <p>{skill}</p>
                </div>
                <div className={style.btnContainer}>
                  <div
                    className={`${style.reorderBtn} ${
                      index === skills.length - 1 ? style.disabled : ""
                    }`}
                    onClick={() => moveDown(index)}
                  >
                    <CircleArrowDown />
                  </div>
                  <div
                    className={`${style.reorderBtn} ${
                      index === 0 ? style.disabled : ""
                    }`}
                    onClick={() => moveUp(index)}
                  >
                    <CircleArrowUp />
                  </div>
                  <div
                    className={style.deleteBtn}
                    onClick={() => handleDelete(index)}
                  >
                    <CircleX />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isOrderChanged && (
          <motion.div
            className={style.saveBtnContainer}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button
              type="button"
              className={style.resetBtn}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className={style.saveBtn}
              onClick={handleSave}
            >
              Save
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EditSkills;