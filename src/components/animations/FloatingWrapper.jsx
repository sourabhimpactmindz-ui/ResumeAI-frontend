import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function FloatingWrapper({
  children,
  className = "",
  y = 12,
  duration = 6.5,
  rotation = 0.6,
  delay = null,
  repel = true,
  repelDistance = 120,
  repelStrength = 14,
}) {
  const wrapperRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!wrapperRef.current || reducedMotion) return;

    const el = wrapperRef.current;
    const actualDelay = delay !== null ? delay : Math.random() * 2;
    const actualDuration = duration + (Math.random() * 2 - 1);

    // Continuous Weightless Float
    const floatTween = gsap.to(el, {
      y: `+=${y}`,
      rotation: rotation ? (Math.random() > 0.5 ? `+=${rotation}` : `-=${rotation}`) : 0,
      duration: actualDuration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: actualDelay,
    });

    // Optional Cursor Repel
    let handleMouseMove;
    if (repel) {
      handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (dist < repelDistance) {
          const factor = (1 - dist / repelDistance) * repelStrength;
          gsap.to(el, {
            x: -(deltaX / dist) * factor,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, {
            x: 0,
            duration: 0.6,
            ease: "power1.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      floatTween.kill();
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [y, duration, rotation, delay, repel, repelDistance, repelStrength, reducedMotion]);

  return (
    <div ref={wrapperRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

