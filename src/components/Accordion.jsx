import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items = [], allowMultiple = false, className = "" }) {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const toggle = (idx) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(idx) ? [] : [idx]));
    }
  };

  return (
    <div className={`flex flex-col gap-3.5 w-full ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? "bg-c-800/90 border-c-300/40 shadow-[0_12px_28px_-6px_rgba(155,168,171,0.14)]"
                : "bg-c-800/50 border-c-700/50 hover:border-c-600 hover:bg-c-800/70"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer select-none"
              aria-expanded={isOpen}
            >
              <span className="font-heading font-semibold text-base md:text-lg text-c-100 pr-4">
                {item.q || item.title}
              </span>
              <span
                className={`w-8 h-8 rounded-full border border-c-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-c-700/60 text-c-100" : "text-c-300"
                }`}
              >
                <ChevronDown size={18} />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 md:px-6 md:pb-6 text-c-300 font-sans text-sm md:text-base leading-relaxed border-t border-c-700/40 pt-3">
                  {item.a || item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

