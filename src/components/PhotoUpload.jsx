import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { toast } from "react-toastify";
import "../styles/PhotoUpload.css";

const MAX_SIZE = 400;         
const MAX_FILE_MB = 5;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * value:    current photo (base64 or url)
 * onChange: called with the new base64 string, or "" when the photo is removed
 */
export default function PhotoUpload({ value, onChange }) {
  const input = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file (JPG or PNG).");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`Image is too large. Please use one under ${MAX_FILE_MB} MB.`);
      return;
    }

    try {
      onChange(await fileToDataUrl(file));
    } catch {
      toast.error("Could not read this image. Please try another one.");
    }
    e.target.value = ""; // lets the user pick the same file again
  };

  return (
    <div className="pu">
      <button type="button" className="pu__circle" onClick={() => input.current?.click()} aria-label="Upload photo">
        {value ? <img src={value} alt="Your photo" /> : <Camera size={22} />}
      </button>

      <div className="pu__text">
        <button type="button" className="pu__btn" onClick={() => input.current?.click()}>
          {value ? "Change photo" : "Upload photo"}
        </button>
        {value && (
          <button type="button" className="pu__remove" onClick={() => onChange("")}>
            <X size={14} /> Remove
          </button>
        )}
        <span className="pu__hint">JPG or PNG, a square photo looks best.</span>
      </div>

      <input ref={input} type="file" accept="image/*" onChange={handleFile} hidden />
    </div>
  );
}