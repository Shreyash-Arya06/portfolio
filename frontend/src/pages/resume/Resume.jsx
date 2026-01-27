import React from "react";
import {Download} from "lucide-react";
import style from "./Resume.module.css";

const Resume = () => {
  const pdfUrl = "/resume.pdf";

  return (
    <>
      <div className={style.page}>
        <iframe
          src={pdfUrl}
          title="Resume Document"
          className={style.resumeFrame}
        />
      </div>
    </>
  );
}

export default Resume;