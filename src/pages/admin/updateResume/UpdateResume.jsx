import React, { useState } from "react";
import { FileUp, Link as LinkIcon, Save, Eye, FileText } from "lucide-react";
import style from "./UpdateResume.module.css";

const UpdateResume = () => {
  // State for toggling input methods
  const [activeTab, setActiveTab] = useState("file"); // 'file' or 'link'
  
  // State for form data
  const [driveLink, setDriveLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // State for the PDF currently being shown in the viewer
  // Initialize with a dummy PDF or your existing backend URL
  const [pdfUrl, setPdfUrl] = useState("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      // Create a temporary URL to preview the uploaded file immediately
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
    
    // Note: For Google Drive, ensuring the link is an 'embed' link is crucial for iframes.
    // Usually replacing '/view' with '/preview' works for Drive UI links.
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
      // Add logic to send 'selectedFile' to your backend using FormData
    } else if (activeTab === "link" && driveLink) {
      console.log("Submitting Link:", driveLink);
      // Add logic to send 'driveLink' string to your backend
    }
  };

  return (
    <div className={style.page}>
      <div className={style.container}>
        
        {/* LEFT COLUMN: Controls */}
        <div className={style.controlsSection}>
          <div className={style.header}>
            <h2>Update Resume</h2>
            <p>Choose a method to update your CV</p>
          </div>

          <div className={style.card}>
            {/* Tabs */}
            <div className={style.tabs}>
              <button 
                className={`${style.tab} ${activeTab === "file" ? style.activeTab : ""}`}
                onClick={() => setActiveTab("file")}
              >
                <FileUp size={18} />
                Upload File
              </button>
              <button 
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

        {/* RIGHT COLUMN: PDF Viewer */}
        <div className={style.previewSection}>
          <div className={style.previewHeader}>
            <h3>Live Preview</h3>
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