import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, X } from "lucide-react";

import style from "./EditTimeline.module.css";

const EditTimeline = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const timelineData = [
    { year: "2019", title: "Class 10th", subtitle: "Secondary Education" },
    { year: "2021", title: "Class 12th", subtitle: "Higher Secondary" },
    { year: "2022", title: "Admission in IIT BHU", subtitle: "Mathematics & Computing" },
    { year: "2026", title: "Intern at Sciforn", subtitle: "Upcoming Summer Intern" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({
      year: "",
      title: "",
      desc: ""
    });
  }, [reset]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const loadEvent = (timelineItem) => {
    setIsUpdate(true);
    reset({
      year: timelineItem.year,
      title: timelineItem.title,
      desc: timelineItem.subtitle 
    });
  }

  const promptDelete = (e, index) => {
    e.stopPropagation();
    console.log("Attempted to delete index", index);
  }

  const resetForm = () => {
    reset();
  }

  const clearForm = () => {
    setIsUpdate(false);
    reset({
      year: "",
      title: "",
      desc: ""
    });
  }

  return (
    <>
      <div className={style.page}>
        <div className={style.previousData}>
          <div className={style.previousDataTitle} onClick={toggleMenu}>
            <p>Previous Data</p>
            {menuOpen && <ChevronDown />}
            {!menuOpen && <ChevronUp />}
          </div>
          {menuOpen && 
          <div className={style.eventsList}>
            {timelineData.map((data, index) => (
              <div key={index} className={style.event}
              onClick={() => loadEvent(data)}>
                <div className={style.titleRow}>
                  <div className={style.title}>
                    <p>{data.title}</p>
                    <div className={style.titleLine}></div>
                  </div>
                  <div className={style.cut}>
                    <X onClick={(e) => promptDelete(e, index)}/>
                  </div>
                </div>
                <div className={style.year}>
                  <p>{data.year}</p>
                </div>
                <div className={style.desc}>
                  <p>{data.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          }
        </div>
        <div className={style.addData}>
          <div className={style.addDataTitle}>
            <p>Add or Modify</p>
          </div>
          <div className={style.formArea}>
            <form className={style.forms} onSubmit={handleSubmit(onSubmit)}>
              <div className={style.formGroup}>
                <label>Year</label>
                <input
                  {...register("year", {
                    required: "Year is required",
                  })}
                />
                {errors.year && (
                  <span className={style.error}>{errors.year.message}</span>
                )}
              </div>
              <div className={style.formGroup}>
                <label>Title</label>
                <input
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                {errors.title && (
                  <span className={style.error}>{errors.title.message}</span>
                )}
              </div>
              <div className={style.formGroup}>
                <label>Description</label>
                <input
                  {...register("desc", {
                    required: "Required",
                  })}
                />
                {errors.desc && (
                  <span className={style.error}>{errors.desc.message}</span>
                )}
              </div>
              <div className={style.btnContainer}>
                {isDirty && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className={style.resetBtn}
                  >
                    Reset
                  </button>
                )}
                {isUpdate && (
                  <button 
                    type="button"
                    onClick={clearForm}
                    className={style.clearBtn}
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className={style.submitBtn}
                  disabled={!isDirty}
                >
                  {isUpdate ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTimeline;
