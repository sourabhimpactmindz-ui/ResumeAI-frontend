import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollZoomHero({
  children,
  visual,
  className = "",
}) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const visualRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const container = containerRef.current;
    const headline = headlineRef.current;
    const visualEl = visualRef.current;

    const ctx = gsap.context(() => {
      // Set initial 3D perspective
      gsap.set(visualEl, {
        transformPerspective: 1200,
        rotateX: 8,
        scale: 0.94,
        filter: "blur(4px)",
        transformOrigin: "center top",
      });

      // Scrub timeline tied to the hero scroll through viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Headline gently floats up and dims as user scrolls down
      tl.to(
        headline,
        {
          y: -60,
          opacity: 0.2,
          scale: 0.97,
          ease: "none",
        },
        0
      );

      // Visual scales into full crisp focus and tilts flat
      tl.to(
        visualEl,
        {
          scale: 1.06,
          rotateX: 0,
          filter: "blur(0px)",
          ease: "none",
        },
        0
      );
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-start pt-28 pb-16 px-4 overflow-hidden ${className}`}
    >
      {/* Background ambient deep-space aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-c-700/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Floating Headline Area */}
      <div
        ref={headlineRef}
        className="relative z-10 w-full max-w-5xl mx-auto text-center will-change-transform"
      >
        {children}
      </div>

      {/* Levitating Zooming ATS Visual */}
      <div
        ref={visualRef}
        className="relative z-0 w-full max-w-3xl mt-10 will-change-transform"
      >
        {visual}
      </div>
    </div>
  );
}
