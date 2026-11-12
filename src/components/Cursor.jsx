import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleElementHover = (e) => {
      const target = e.target;
      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], .levitate-card-interactive, [data-cursor="hover"]'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [mouseX, mouseY, isVisible, reducedMotion]);

  if (reducedMotion || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full border border-c-100/50 mix-blend-screen backdrop-blur-[1px]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        width: isHovered ? 48 : 22,
        height: isHovered ? 48 : 22,
        backgroundColor: isHovered
          ? "rgba(204, 208, 207, 0.14)"
          : "rgba(155, 168, 171, 0.05)",
        borderColor: isHovered
          ? "rgba(204, 208, 207, 0.85)"
          : "rgba(155, 168, 171, 0.45)",
        boxShadow: isHovered
          ? "0 0 20px rgba(204, 208, 207, 0.35)"
          : "0 0 10px rgba(155, 168, 171, 0.15)",
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      aria-hidden="true"
    />
  );
}

