import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function StaggerFromEdges({
  children,
  className = "",
  itemSelector = ".stagger-item",
  staggerTime = 0.1,
  start = "top 85%",
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const items = el.querySelectorAll(itemSelector);

    if (items.length === 0) return;

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(items, {
      opacity: 0,
      y: 60,
      scale: 0.92,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: start,
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: {
            each: staggerTime,
            from: "edges",
          },
          clearProps: "transform",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [itemSelector, staggerTime, start, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

