import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

export function useCursorRepel({ distance = 140, strength = 18 } = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const el = ref.current;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - elCenterX;
      const deltaY = e.clientY - elCenterY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (dist < distance) {
        const factor = (1 - dist / distance) * strength;
        const moveX = -(deltaX / dist) * factor;
        const moveY = -(deltaY / dist) * factor;

        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [distance, strength, reducedMotion]);

  return ref;
}

export default useCursorRepel;

