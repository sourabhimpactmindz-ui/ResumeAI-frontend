import { useState, useRef } from "react";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export default function Dropzone({
  file,
  setFile,
  accept = ".pdf,.docx",
  maxSizeMB = 10,
  className = "",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateAndSet = (uploadedFile) => {
    if (!uploadedFile) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    const isValidType =
      validTypes.includes(uploadedFile.type) ||
      uploadedFile.name.endsWith(".pdf") ||
      uploadedFile.name.endsWith(".docx");

    if (!isValidType) {
      toast.error("Hmm, that file type isn't supported. Please drop a PDF or DOCX resume.");
      return;
    }

    if (uploadedFile.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File is too large. Please upload a resume under ${maxSizeMB}MB.`);
      return;
    }

    setFile(uploadedFile);
    toast.success("Resume attached! Ready to inspect.");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    validateAndSet(dropped);
  };

  const handleInputChange = (e) => {
    if (e.target.files?.[0]) {
      validateAndSet(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        id="resume-dropzone-input"
      />

      <label
        htmlFor="resume-dropzone-input"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center min-h-[220px] p-6 rounded-[28px] border-2 border-dashed transition-all duration-400 cursor-pointer select-none ${
          isDragging
            ? "border-c-100 bg-c-700/60 scale-[1.02] shadow-[0_20px_45px_rgba(204,208,207,0.2)]"
            : file
            ? "border-c-success/60 bg-c-800/80 shadow-[0_16px_36px_-8px_rgba(127,181,154,0.18)]"
            : "border-c-600/60 bg-c-800/40 hover:border-c-300 hover:bg-c-800/70 hover:shadow-[0_16px_36px_-8px_rgba(155,168,171,0.14)] hover:-translate-y-1"
        }`}
      >
        {file ? (
          <div className="flex flex-col items-center text-center w-full max-w-md">
            <div className="w-14 h-14 rounded-full bg-c-success/20 text-c-success border border-c-success/40 flex items-center justify-center mb-3.5 shadow-[0_0_16px_rgba(127,181,154,0.3)]">
              <CheckCircle2 size={28} />
            </div>

            <div className="w-full bg-c-900/80 border border-c-700/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3 overflow-hidden text-left">
                <FileText size={24} className="text-c-100 shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm font-heading font-bold text-c-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-c-300">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready for ATS scan
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemove}
                title="Remove file"
                className="w-8 h-8 rounded-full bg-c-700 hover:bg-c-error/30 hover:text-c-error border border-c-600 flex items-center justify-center shrink-0 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <p className="mt-3 text-xs text-c-300 font-sans underline underline-offset-4 hover:text-c-100">
              Click or drop another file to replace
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-c-700/60 border border-c-600/50 flex items-center justify-center text-c-100 mb-3.5 shadow-md">
              <UploadCloud size={28} />
            </div>

            <h3 className="font-heading font-bold text-base md:text-lg text-c-100 mb-1">
              Drop your resume here, or <span className="text-c-300 underline underline-offset-4">browse</span>
            </h3>

            <p className="text-xs md:text-sm text-c-600 font-sans max-w-xs">
              Supports PDF or DOCX up to 10MB. 100% private in-memory processing.
            </p>
          </div>
        )}
      </label>
    </div>
  );
}

