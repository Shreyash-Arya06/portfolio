import React, { useState } from "react";
import { FileUp, Link as LinkIcon, Save, Eye, FileText } from "lucide-react";
import style from "./UpdateResume.module.css";

const UpdateResume = () => {
  const [activeTab, setActiveTab] = useState("file");
  const [driveLink, setDriveLink] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const tempUrl = URL.createObjectURL(file);
      setPdfUrl(tempUrl);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleLinkChange = (e) => {
    setDriveLink(e.target.value);
  };

  const handleLinkPreview = () => {
    if (!driveLink) return;
    let formattedLink = driveLink;
    if (driveLink.includes("drive.google.com") && driveLink.includes("/view")) {
        formattedLink = driveLink.replace("/view", "/preview");
    }
    setPdfUrl(formattedLink);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "file" && selectedFile) {
      console.log("Submitting File:", selectedFile);
    } else if (activeTab === "link" && driveLink) {
      console.log("Submitting Link:", driveLink);
    }
  };

  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.controlsSection}>
          <div className={style.title}>
            <p>Update Resume</p>
          </div>
          <div className={style.card}>
            <div className={style.header}>
              <p>Choose a method to update your CV</p>
            </div>
            <div className={style.tabs}>
              <button 
                type="button"
                className={`${style.tab} ${activeTab === "file" ? style.activeTab : ""}`}
                onClick={() => setActiveTab("file")}
              >
                <FileUp size={18} />
                Upload File
              </button>
              <button 
                type="button"
                className={`${style.tab} ${activeTab === "link" ? style.activeTab : ""}`}
                onClick={() => setActiveTab("link")}
              >
                <LinkIcon size={18} />
                Drive Link
              </button>
            </div>
            <form onSubmit={handleSubmit} className={style.formContent}>
              {activeTab === "file" ? (
                <div className={style.inputGroup}>
                  <label>Select PDF from System</label>
                  <div className={style.fileDropArea}>
                    <input 
                      key="file-input-control"
                      type="file" 
                      accept="application/pdf" 
                      onChange={handleFileChange}
                      id="resumeUpload"
                      className={style.fileInputHidden}
                    />
                    <label htmlFor="resumeUpload" className={style.fileLabel}>
                      <FileText size={32} />
                      <p>{selectedFile ? selectedFile.name : "Click to browse or drag PDF here"}</p>
                    </label>
                  </div>
                </div>
              ) : (
                <div className={style.inputGroup}>
                  <label>Google Drive / External Link</label>
                  <div className={style.linkInputWrapper}>
                    <input 
                      key="link-input-control"
                      type="text" 
                      placeholder="https://drive.google.com/..." 
                      value={driveLink}
                      onChange={handleLinkChange}
                      className={style.textInput}
                    />
                    <button type="button" onClick={handleLinkPreview} className={style.previewBtn} title="Preview Link">
                        <Eye size={18} />
                    </button>
                  </div>
                  <p className={style.hint}>Ensure the Drive link is set to "Anyone with the link".</p>
                </div>
              )}
              <div className={style.actionButtons}>
                <button type="submit" className={style.saveBtn}>
                  <Save size={18} />
                  Save Resume
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={style.previewSection}>
          <div className={style.previewHeader}>
            <p>Live Preview</p>
          </div>
          <div className={style.pdfContainer}>
            {pdfUrl ? (
              <iframe 
                src={pdfUrl} 
                title="Resume Preview"
                className={style.pdfFrame}
              />
            ) : (
              <div className={style.noPdf}>
                <p>No resume selected</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResume;