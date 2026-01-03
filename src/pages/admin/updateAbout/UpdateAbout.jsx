import React, {useEffect} from "react";
import { useForm } from "react-hook-form";

import style from "./UpdateAbout.module.css";

const UpdateAbout = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors, isDirty},
  } = useForm();

  useEffect(() => {
    // Replace this with actual API call
    const fetchData = async () => {
        // const response = await fetch('/api/about');
        // const data = await response.json();
        
        // Mock data for example
        const data = {
            name: "Shreyash Arya",
            posLine1: "Full Stack Developer",
            posLine2: "Mathematics & Computing Student",
            orgName: "IIT BHU",
            about: "I love coding..."
        };
        reset(data); 
    };
    fetchData();
  }, [reset]);

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    // Call update API here
  };

  return (
    <>
      <div className={style.page}>
        <div className={style.formArea}>
          <form className={style.forms} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.formGroup}>
              <label>Name</label>
              <input {
                ...register("name", {
                  required: "Name is required"
                })}
                placeholder="Enter name"
              />
              {errors.name && <span className={style.error}>{errors.name.message}</span>}
            </div>
            <div className={style.formGroup}>
              <label>Position Line 1</label>
              <input {
                ...register("posLine1", {
                  required: "Position is required"
                })}
                placeholder="Enter position"
              />
              {errors.posLine1 && <span className={style.error}>{errors.posLine1.message}</span>}
            </div>
            <div className={style.formGroup}>
              <label>Position Line 2</label>
              <input {
                ...register("posLine2")}
                placeholder="Enter position"
              />
            </div>
            <div className={style.formGroup}>
              <label>Organization Name</label>
              <input {...register("orgName", {
                required: "Organization is required"
              })}
              placeholder="Enter organization"
              />
              {errors.orgName && <span className={style.error}>{errors.orgName.message}</span>}
            </div>
            <div className={style.formGroup}>
            <label>About</label>
            <textarea 
                {...register("about", {
                  required: "About is required"
                })}
                rows={5}
                placeholder="Tell more about yourself"
            />
            {errors.about && <span className={style.error}>{errors.about.message}</span>}
          </div>
          <div className={style.btnContainer}>
             {isDirty && (
                <button 
                  type="button" 
                  onClick={() => reset()} 
                  className={style.resetBtn}
                >
                  Reset Changes
                </button>
             )}
             <button 
                type="submit" 
                className={style.submitBtn} 
                disabled={!isDirty}
             >
                Update Profile
             </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateAbout;