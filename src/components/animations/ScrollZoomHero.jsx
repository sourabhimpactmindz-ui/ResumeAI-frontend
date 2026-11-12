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
        transformPerspective: 1000,
        rotateX: 8,
        scale: 1,
        filter: "blur(6px)",
        transformOrigin: "center top",
      });

      // Pinned scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // Headline floats up and fades
      tl.to(
        headline,
        {
          y: -100,
          opacity: 0,
          scale: 0.95,
          ease: "power2.inOut",
        },
        0
      );

      // Visual scales 1 to 3.5 with rotateX 8deg to 0 and blur-to-sharp
      tl.to(
        visualEl,
        {
          scale: 2.2, // smoothly calibrated for responsive viewport without breaking boundary
          rotateX: 0,
          filter: "blur(0px)",
          ease: "power2.inOut",
        },
        0
      );
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 pb-16 px-4 ${className}`}
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

