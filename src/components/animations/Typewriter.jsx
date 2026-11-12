import { useState, useEffect } from "react";

export default function Typewriter({
  lines = ["before any recruiter does.", "in just 6 seconds.", "so you don't get rejected.", "and shows exactly how to fix it."],
  typeSpeed = 60,
  deleteSpeed = 35,
  pause = 2200,
  className = "",
  cursorClass = "text-c-100",
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    const targetLine = lines[currentLineIndex];

    let timer;

    if (!isDeleting) {
      if (currentText.length < targetLine.length) {
        timer = setTimeout(() => {
          setCurrentText(targetLine.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing full line, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetLine.slice(0, currentText.length - 1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next line
        setIsDeleting(false);
        setCurrentLineIndex((prev) => (prev + 1) % lines.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentLineIndex, lines, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <span
        className={`ml-1 inline-block w-[2px] h-[1em] bg-c-100 animate-pulse align-middle ${cursorClass}`}
        aria-hidden="true"
      />
    </span>
  );
}

