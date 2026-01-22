import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Camera } from "lucide-react";
import style from "./AddProjectModal.module.css";

const AddProject = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const defaultValues = {
    title: "",
    keywords: "",
    desc: "",
    profilePic: null 
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues,
    mode: "onChange"
  });

  const imageFile = watch("profilePic");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const newUrl = URL.createObjectURL(file);
      setImagePreview(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    }
  }, [imageFile]);

  const onSubmit = (data) => {
    console.log(data);
    resetForm();
  };

  const resetForm = () => {
    reset(defaultValues); 
    setImagePreview(null);
  };

  return (
    <div className={style.page}>
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.forms}>
          <div className={style.uploadContainer}>
            <div className={style.imageWrapper}>
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className={style.previewImg} 
                />
              ) : (
                <div className={style.placeholder}>
                  <Camera size={32} color='#525252' />
                </div>
              )}
              <input 
                type="file"
                id="profilePic"
                accept="image/png, image/jpeg, image/jpg"
                className={style.hiddenInput}
                {...register("profilePic", {
                  validate: {
                    lessThan2MB: (files) => 
                      !files[0] || files[0].size < 2000000 || "Max 2MB",
                    acceptedFormats: (files) =>
                      !files[0] || ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0].type) || "Only PNG, JPEG allowed",
                  },
                })}
              />
              <label htmlFor="profilePic" className={style.uploadOverlay}>
                <Camera size={20} />
              </label>
            </div>
            {errors.profilePic && (
               <span className={style.errorMessage} style={{textAlign: 'center', display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '5px'}}>
                 {errors.profilePic.message}
               </span>
            )}
          </div>
          <div className={style.inputGroup}>
            <label>Title</label>
            <input 
              placeholder="Project 1"
              {...register("title", { required: "Enter title" })}
            />
            {errors.title && <span className={style.error}>{errors.title.message}</span>}
          </div>

          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <label>Keywords</label>
            </div>
            <input 
              placeholder="React; Node; CSS (';' - separated)"
              {...register("keywords", { required: "Keywords are required" })}
            />
            {errors.keywords && <span className={style.error}>{errors.keywords.message}</span>}
          </div>
          <div className={style.inputGroup}>
            <label>Description</label>
            <textarea 
            placeholder="The objective of this poject is ..."
              {...register("desc", { required: "Description is required" })}
              rows="5"
            />
            {errors.desc && <span className={style.error}>{errors.desc.message}</span>}
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
            <button
              type="submit"
              className={style.submitBtn}
              disabled={!isDirty}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProject;