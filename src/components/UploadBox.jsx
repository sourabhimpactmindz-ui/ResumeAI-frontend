import { useState, useRef } from "react";
import "../styles/UploadBox.css";
import { toast } from "react-toastify";
import { UploadCloud, FileText, X, Sparkles } from "lucide-react";

export default function UploadBox({ onAnalyze, isLoading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast.error("Please drop a valid PDF file");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!file) {
      toast.error("Please upload your resume (PDF)");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please paste the target job description");
      return;
    }

    if (
      jobDescription.trim().length < 50 ||
      jobDescription.trim().split(/\s+/).length < 10
    ) {
      toast.error("Please enter a more complete job description (at least 10 words)");
      return;
    }

    onAnalyze(file, jobDescription);
  };

  return (
    <div className="upload-box">
      <input
        ref={fileInputRef}
        type="file"
        id="resume-upload"
        accept=".pdf"
        onChange={handleFileChange}
        hidden
      />

      {/* DROPZONE / FILE UPLOAD */}
      <div className="upload-box__col">
        <label
          htmlFor="resume-upload"
          className={`upload-box__dropzone ${isDragging ? "dragging" : ""} ${
            file ? "has-file" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="upload-box__file-selected-wrapper">
              <div className="upload-box__file-selected">
                <div className="upload-box__file-icon">
                  <FileText size={28} />
                </div>
                <div className="upload-box__file-details">
                  <span className="upload-box__file-name" title={file.name}>
                    {file.name}
                  </span>
                  <span className="upload-box__file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB · PDF Ready
                  </span>
                </div>
                <button
                  type="button"
                  className="upload-box__remove-btn"
                  onClick={handleRemoveFile}
                  title="Remove resume"
                  aria-label="Remove resume"
                >
                  <X size={16} />
                </button>
              </div>
              <span className="upload-box__replace-hint">
                Click box to replace file
              </span>
            </div>
          ) : (
            <>
              <div className="upload-box__dropzone-icon">
                <UploadCloud size={36} />
              </div>
              <span className="upload-box__dropzone-label">
                Upload your resume
              </span>
              <span className="upload-box__dropzone-sub">
                Drag & drop or click to browse (PDF, up to 5MB)
              </span>
            </>
          )}
        </label>
      </div>

      {/* JOB DESCRIPTION INPUT */}
      <div className="upload-box__col upload-box__desc">
        <div className="upload-box__desc-header">
          <label htmlFor="jd-input" className="upload-box__desc-label">
            Target Job Description
          </label>
          <span className="upload-box__char-count">
            {jobDescription.length} characters
          </span>
        </div>

        <textarea
          id="jd-input"
          className="upload-box__textarea"
          placeholder="Paste the full job post here (e.g. required skills, qualifications, responsibilities) to calculate your match score..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      {/* FOOTER CTA */}
      <div className="upload-box__footer">
        <button
          type="button"
          className="upload-box__analyze-btn"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="upload-spinner" />
              <span>Analyzing Resume with AI...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Analyze & Match Score →</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
