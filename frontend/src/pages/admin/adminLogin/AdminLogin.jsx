import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { User, Lock, LogIn } from "lucide-react";

import style from "./AdminLogin.module.css";

const AdminLogin = () => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all"
  });

  const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

  const onCaptchaChange = (token) => {
    if (token) setCaptchaVerified(true);
  };

  const onSubmit = (data) => {
    if (!captchaVerified) {
      alert("Please verify you are not a robot!");
      return;
    }
    console.log("Login Successful:", data);
    alert("Logged in successfully");
  };

  return (
    <div className={style.page}>
      <div className={style.loginCard}>
        <div className={style.header}>
          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.fieldWrapper}>
            <div className={style.inputGroup}>
              <User className={style.icon} size={20} />
              <input
                type="text"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className={style.errorMessage}>{errors.email.message}</span>
            )}
          </div>
          <div className={style.fieldWrapper}>
            <div className={style.inputGroup}>
              <Lock className={style.icon} size={20} />
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    length: (v) =>
                      (v.length >= 6 && v.length <= 20) ||
                      "Must be between 6 and 20 characters",
                    digit: (v) => 
                      /(?=.*\d)/.test(v) || "Must contain at least 1 number",
                    upper: (v) =>
                      /(?=.*[A-Z])/.test(v) || "Must contain 1 uppercase letter",
                    lower: (v) =>
                      /(?=.*[a-z])/.test(v) || "Must contain 1 lowercase letter",
                    special: (v) =>
                      /(?=.*[@_])/.test(v) || "Must contain 1 special char (@ or _)",
                  },
                })}
              />
            </div>
            {errors.password && errors.password.types && (
              <div className={style.errorContainer}>
                {Object.values(errors.password.types).map((msg, i) => (
                  <span key={i} className={style.errorMessage}>• {msg}</span>
                ))}
              </div>
            )}
            {errors.password && !errors.password.types && (
               <span className={style.errorMessage}>{errors.password.message}</span>
            )}
          </div>

          <div className={style.captchaContainer}>
            <ReCAPTCHA
              sitekey={TEST_SITE_KEY}
              onChange={onCaptchaChange}
              ref={captchaRef}
              theme="dark"
            />
          </div>

          <button
            type="submit"
            className={`${style.loginBtn} ${
              !captchaVerified ? style.disabled : ""
            }`}
            disabled={!captchaVerified}
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;