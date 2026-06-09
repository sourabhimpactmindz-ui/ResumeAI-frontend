import { useState } from "react";
import "../styles/UploadBox.css";
import Button from "./Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UploadBox({ onAnalyze , isLoading }) {
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
const handleClick = () => {
  const token = localStorage.getItem("accessToken");

  if(!token){
    toast.error("Please login first");

    setTimeout(() => {
      navigate("/login")
    },1500)

    return;
    
  }
  if (!file) {
    toast.error("Please upload your resume");
    return;
  }

  if (!jobDescription.trim()) {
    toast.error("Please enter job description");
    return;
  }

  if (
  jobDescription.trim().length < 50 ||
  jobDescription.trim().split(/\s+/).length < 10
) {
  toast.error(
    "Please enter a complete job description"
  );
  return;
}

  onAnalyze(file, jobDescription);
};
  return (
    <div className="upload-box">
      <input
        type="file"
        id="resume-upload"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        hidden
      />

      <label
        htmlFor="resume-upload"
        className="upload-box__dropzone"
      >
        <span className="upload-box__dropzone-icon">
          📄
        </span>

        <span className="upload-box__dropzone-label">
          {file ? file.name : "Drop your resume here"}
        </span>

        <span className="upload-box__dropzone-sub">
          PDF, Max 5MB
        </span>
      </label>

      <div className="upload-box__desc">
        <span className="upload-box__desc-label">
          Job Description
        </span>

        <textarea
          className="upload-box__textarea"
          placeholder="Paste job description here for tailored matching..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
        />
      </div>

      <div className="upload-box__footer">
       <Button
    label={
      isLoading
        ? "Analyzing..."
        : "✦ Analyze Resume"
    }
    variant="primary"
    size="md"
    onClick={handleClick}
    disabled={isLoading}
  />
      </div>
    </div>
  );
}