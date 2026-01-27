import React, { useState, useRef, useEffect } from "react";
import { X, Eye, Pencil, Trash2, CircleArrowDown, CircleArrowUp } from "lucide-react";
import style from "./EditCategoryModal.module.css";

const EditCategoryModal = ({ onClose, categories }) => {
  const modalRef = useRef(null);
  const [newCategory, setNewCategory] = useState("");

  const handleKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const firstInput = modalRef.current.querySelector("input");
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleAddCategory = () => {
    if(!newCategory.trim()) return;
    console.log(newCategory);
    setNewCategory("");
  };

  return (
    <div className={style.modalOverlay} onKeyDown={handleKeyDown}>
      <div className={style.modalContainer} ref={modalRef}>
        <div className={style.modalHeader}>
          <p>Edit Categories</p>
          <button className={style.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={style.addCategory}>
          <p className={style.labelText}>Add new category</p>
          <div className={style.inputGroup}>
            <input
              type="text"
              className={style.inputField}
              placeholder="e.g., Marketing Projects"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleAddCategory}
              disabled={newCategory === ""}
              className={style.saveBtn}
            >
              Add
            </button>
          </div>
        </div>

        <div className={style.tableArea}>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.colSr}>Sr. No.</th>
                <th className={style.colTitle}>Category</th>
                <th className={style.colAction}>Actions</th>
                <th className={style.colReorder}>Reorder</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((project, index) => (
                <tr key={index}>
                  <td className={style.srNo}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </td>
                  <td>
                    <div className={style.projectTitle}>
                      <p>{project}</p>
                    </div>
                  </td>
                  <td>
                    <div className={style.actionButtons}>
                      <button className={style.editBtn} title="Edit">
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
                        <CircleArrowUp size={22} />
                      </button>
                      <button className={style.reorderBtn}>
                        <CircleArrowDown size={22} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No projects found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;