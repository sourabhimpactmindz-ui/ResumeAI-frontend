import { forwardRef } from "react";

export const Card = forwardRef(function Card(
  {
    children,
    className = "",
    interactive = false,
    glow = true,
    padding = "p-8 md:p-10",
    onClick,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`relative bg-c-800/80 backdrop-blur-xl border border-c-700/50 rounded-[32px] transition-all duration-400 ease-out ${
        glow ? "shadow-[0_20px_40px_-12px_rgba(155,168,171,0.12)]" : ""
      } ${
        interactive
          ? "cursor-pointer hover:-translate-y-2 hover:border-c-300/40 hover:shadow-[0_28px_60px_-10px_rgba(155,168,171,0.22)]"
          : ""
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;

