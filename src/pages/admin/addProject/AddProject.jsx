import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ChevronDown, ChevronUp, Camera } from "lucide-react";

import style from "./AddProject.module.css";

const AddProject = () => {
  const [category, setCategory] = useState("");
  const [showSec1, setShowSec1] = useState(true);
  const [showSec2, setShowSec2] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [categories, addToCategories] = useState([
    "Web Dev", "Academic", "temp"
  ]);

  const defaultValues = {
    title: "",
    keywords: "",
    desc: "",
    projectSS: null 
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
      <div className={style.hero}>
        <div className={style.firstSection}>
          <div className={style.header} onClick={() => setShowSec1(!showSec1)}>
            <p>1. Select Category</p>
            {showSec1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {showSec1 && (
            <div className={style.selectCategory}>
              <p>Add to - </p>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={style.categorySelect}
              >
                <option value="">--- Select Category ---</option>
                {categories.map((categoryName, index) => (
                  <option key={index} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className={style.secondSection}>
          <div className={style.header} onClick={() => setShowSec2(!showSec2)}>
            <p>2. Add Project to {category === "" ? "_____" : category}</p>
            {showSec2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {showSec2 && (
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
                      id="projectSS"
                      accept="image/png, image/jpeg, image/jpg"
                      className={style.hiddenInput}
                      {...register("projectSS", {
                        validate: {
                          lessThan2MB: (files) => 
                            !files || !files[0] || files[0].size < 2000000 || "Max 2MB",
                          acceptedFormats: (files) =>
                            !files || !files[0] || ['image/jpeg', 'image/png', 'image/jpg'].includes(files[0].type) || "Only PNG, JPEG allowed",
                        },
                      })}
                    />
                    <label htmlFor="projectSS" className={style.uploadOverlay}>
                      <Camera size={20} />
                    </label>
                  </div>
                  {errors.projectSS && (
                    <span className={style.errorMessage} style={{textAlign: 'center', display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '5px'}}>
                      {errors.projectSS.message}
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
          )}
        </div>
      </div>
    </div>
  )
}

export default AddProject;