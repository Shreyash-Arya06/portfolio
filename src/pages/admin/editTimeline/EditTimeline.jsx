import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Trash2, History, PenLine } from "lucide-react";

import style from "./EditTimeline.module.css";

const EditTimeline = () => {
  const [menuOpen, setMenuOpen] = useState(true);
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
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }

  const promptDelete = (e, index) => {
    e.stopPropagation();
    if(window.confirm("Are you sure you want to delete this event?")) {
        console.log("Deleted index", index);
    }
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
        <div className={style.section}>
          <div className={style.previousDataTitle} onClick={() => setMenuOpen(!menuOpen)}>
            <div className={style.headerTitle}>
              <History size={20} color="#a855f7" />
              <p>Timeline Events</p>
            </div>
            <div className={style.iconBtn}>
              {menuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          <div className={`${style.eventsWrapper} ${menuOpen ? style.open : ''}`}>
            <div className={style.eventsInner}>
              <div className={style.eventsList}>
                {timelineData.map((data, index) => (
                  <div 
                    key={index} 
                    className={style.eventCard} 
                    onClick={() => loadEvent(data)}
                    title="Click to Edit"
                  >
                    <div className={style.cardHeader}>
                      <span className={style.yearBadge}>{data.year}</span>
                      <div className={style.deleteIcon} onClick={(e) => promptDelete(e, index)}>
                        <Trash2 size={16} />
                      </div>
                    </div>
                    <div className={style.cardContent}>
                      <h3>{data.title}</h3>
                      <p>{data.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={style.section}>
          <div className={style.headerTitle}>
            <PenLine size={20} color="#a855f7" />
            <p>{isUpdate ? "Update Event" : "Add New Event"}</p>
          </div>
          <div className={style.formContainer}>
            <form className={style.forms} onSubmit={handleSubmit(onSubmit)}>
              <div className={style.formGrid}>
                <div className={style.formGroup}>
                  <label>Year</label>
                  <input
                    {...register("year", {
                      required: "Year is required",
                    })}
                    className={style.inputField}
                  />
                  {errors.year && (
                    <span className={style.error}>
                      {errors.year.message}
                    </span>
                  )}
                </div>
                <div className={style.formGroup}>
                  <label>Title</label>
                  <input
                    {...register("title", {
                      required: "Title is required",
                    })}
                    className={style.inputField}
                  />
                  {errors.title && (
                    <span className={style.error}>
                      {errors.title.message}
                    </span>
                  )}
                </div>
              </div>
              <div className={style.formGroup}>
                <label>Description</label>
                <input
                  {...register("desc", {
                    required: "Required",
                  })}
                  className={`${style.inputField} ${style.textArea}`}
                />
                {errors.desc && (
                  <span className={style.error}>
                    {errors.desc.message}
                  </span>
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
