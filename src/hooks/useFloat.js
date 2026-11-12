import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

export function useFloat({
  y = 12,
  duration = 6,
  rotation = 0.5,
  delay = null,
} = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const actualDelay = delay !== null ? delay : Math.random() * 2;
    const actualDuration = duration + (Math.random() * 2 - 1);

    const tween = gsap.to(ref.current, {
      y: `+=${y}`,
      rotation: rotation ? (Math.random() > 0.5 ? `+=${rotation}` : `-=${rotation}`) : 0,
      duration: actualDuration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: actualDelay,
    });

    return () => {
      tween.kill();
    };
  }, [y, duration, rotation, delay, reducedMotion]);

  return ref;
}

export default useFloat;

