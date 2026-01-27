import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Camera, X } from "lucide-react";

import style from "./AddBookModal.module.css";

const AddBookModal = ({ onClose, initialData, overlayTitle }) => {
  const modalRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const defaultValues = {
    title: initialData?.title || "",
    author: initialData?.author || "",
    rating: initialData?.rating || "",
    review: initialData?.review || "",
    cover: initialData?.cover || null
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

  const coverValue = watch("cover");

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
    reset(defaultValues);
  }, [initialData, reset]);

  useEffect(() => {
    if (typeof coverValue === 'string') {
      setImagePreview(coverValue);
    } else if (coverValue && coverValue.length > 0) {
      const file = coverValue[0];
      const newUrl = URL.createObjectURL(file);
      setImagePreview(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    } else {
      setImagePreview(null);
    }
  }, [coverValue]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const firstInput = modalRef.current.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  const onSubmit = (data) => {
    console.log("Submitting:", data);
    resetForm();
  }

  const resetForm = () => {
    reset(defaultValues);
  }

  return (
    <div className={style.modalOverlay} onKeyDown={handleKeyDown}>
      <div className={style.modalContainer} ref={modalRef}>
        <div className={style.modalHeader}>
          <p>{overlayTitle}</p>
          <button className={style.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={style.formArea}>
          <form onSubmit={handleSubmit(onSubmit)} className={style.forms}>
            <div className={style.topSection}>
              <div className={style.uploadContainer}>
                <div className={style.imageWrapper}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className={style.previewImg} />
                  ) : (
                    <div className={style.placeHolder}>
                      <Camera size={32} color="#525252" />
                    </div>
                  )}
                  <input 
                    type="file"
                    id="cover"
                    accept="image/png, image/jpeg, image/jpg"
                    className={style.hiddenInput}
                    {...register("cover", {
                      validate: {
                        lessThan2MB: (v) => {
                          if (typeof v === 'string') return true;
                          return !v || !v[0] || v[0].size < 2000000 || "Max 2MB";
                        },
                        acceptedFormats: (v) => {
                          if (typeof v === 'string') return true;
                          return !v || !v[0] || ['image/jpeg', 'image/png', 'image/jpg'].includes(v[0].type) || "Only PNG/JPEG";
                        }
                      },
                    })}
                  />
                  <label htmlFor="cover" className={style.uploadOverlay}>
                    <Camera size={20} />
                  </label>
                </div>
                {errors.cover && (
                  <span className={style.errorMessage}>
                    • {errors.cover.message}
                  </span>
                )}
              </div>
              <div className={style.rightSection}>
                <div className={style.inputGroup}>
                  <label htmlFor="title">Book Title</label>
                  <input 
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    {...register("title", {
                      required: "Required"
                    })}
                  />
                  {errors.title && (
                    <span className={style.errorMessage}>
                      • {errors.title.message}
                    </span>
                  )}
                </div>
                <div className={style.inputGroup}>
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    id="author"
                    placeholder="Enter author"
                    {...register("author", {
                      required: "Required"
                    })}
                  />
                  {errors.author && (
                    <span className={style.errorMessage}>
                      • {errors.author.message}
                    </span>
                  )}
                </div>
                <div className={style.inputGroup}>
                  <label htmlFor="rating">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    id="rating"
                    placeholder="0 - 5"
                    {...register("rating", {
                      required: "Required",
                      validate: {
                        min: v => parseFloat(v) >= 0 || "Min 0",
                        max: v => parseFloat(v) <= 5 || "Max 5"
                      }
                    })}
                  />
                  {errors.rating && (
                    <span className={style.errorMessage}>
                      • {errors.rating.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="review">Review</label>
              <textarea 
                id="review"
                placeholder="The book depicts ..."
                {...register("review")}
              />
            </div>
            <div className={style.btnContainer}>
              {isDirty && (
                <button type="button" onClick={resetForm} className={style.resetBtn}>
                  Reset
                </button>
              )}
              <button type="submit" className={style.submitBtn} disabled={!isDirty}>
                {initialData ? "Save Changes" : "Add to Shelf"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;