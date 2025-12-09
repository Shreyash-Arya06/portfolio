import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaCopy, FaCheck, FaPhone } from "react-icons/fa";

import style from "./ConnectMe.module.css";
import insta from "../../assets/insta.svg";
import linkedin from "../../assets/linkedin.svg";
import fable from "../../assets/fable.svg";
import github from "../../assets/github.svg";
import wa from "../../assets/wa.svg";

const contactInfo = {
  email: "shreyash.arya2003@gmail.com",
  number: "9044380126",
  address: "Varanasi, India (Open to Remote)"
};

const socialLinks = [
  { id: "wa", url: `https://wa.me/${contactInfo.number}`, icon: wa, alt: "WhatsApp" },
  { id: "github", url: "https://github.com/Shreyash-Arya06", icon: github, alt: "GitHub" },
  { id: "linkedin", url: "https://www.linkedin.com/in/shreyash-arya/", icon: linkedin, alt: "LinkedIn" },
  { id: "instagram", url: "https://www.instagram.com/shreyash.arya16/", icon: insta, alt: "Instagram" },
  { id: "fable", url: "https://fable.co/shreyash-283825741495", icon: fable, alt: "Fable" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const ConnectMe = () => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className={style.pageContainer}>
      <motion.div
        className={style.card}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={style.leftPanel}>
          <div className={style.headerContent}>
            <h1>Let's Connect.</h1>
            <p className={style.status}>
              I am currently open to <strong>SDE/Full-stack Developer Intern roles</strong>.
              Have a project in mind or just want to say hi? Drop me a message!
            </p>
          </div>

          <div className={style.contactDetails}>
            <div className={style.detailRow} onClick={() => handleCopy(contactInfo.email, 'email')}>
              <FaEnvelope className={style.detailIcon} />
              <span>{contactInfo.email}</span>
              <span className={style.copyFeedback}>
                  {copiedField === 'email' ? <FaCheck color="#4ade80" /> : <FaCopy />}
              </span>
            </div>
            <div className={style.detailRow} onClick={() => handleCopy(contactInfo.number, 'number')}>
              <FaPhone className={style.detailIcon} />
              <span>+91 {contactInfo.number}</span>
              <span className={style.copyFeedback}>
                {copiedField === 'number' ? <FaCheck color="#4ade80" /> : <FaCopy />}
              </span>
            </div>
            <div className={style.detailRow}>
              <FaMapMarkerAlt className={style.detailIcon} />
              <span>{contactInfo.address}</span>
            </div>
          </div>

          <div className={style.socialLandingZone}>
            <p>Find me on:</p>
            <motion.div
              className={style.socialIcons}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.socialLink}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <img src={social.icon} alt={social.alt} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
        <div className={style.rightPanel}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.inputGroup}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="John Doe" />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" required placeholder="john@example.com" />
            </div>             
             <div className={style.inputGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required placeholder="Project collaboration" />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required placeholder="Hello, I'd like to talk about..."></textarea>
            </div>
            <button type="submit" className={style.submitBtn}>
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectMe;