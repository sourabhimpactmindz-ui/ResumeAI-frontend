import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function CardStack({
  cards = [],
  className = "",
}) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || cards.length === 0 || reducedMotion) return;

    const container = containerRef.current;
    const cardElements = cardsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // Pin the stack section during scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 12%",
          end: `+=${cardElements.length * 350}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      cardElements.forEach((card, index) => {
        if (index === 0) return;

        const prevCard = cardElements[index - 1];

        // Animate previous card scaling down, dimming, and shifting up
        tl.to(
          prevCard,
          {
            scale: 0.92,
            opacity: 0.45,
            y: -25,
            ease: "none",
          },
          index - 1
        );

        // Slide the new card up and over
        tl.fromTo(
          card,
          {
            yPercent: 120,
            opacity: 0.8,
            scale: 0.96,
          },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
          },
          index - 1
        );
      });
    }, container);

    return () => ctx.revert();
  }, [cards, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className={`flex flex-col gap-8 w-full max-w-4xl mx-auto py-12 ${className}`}>
        {cards.map((card, idx) => (
          <div key={idx} className="w-full">
            {card}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center ${className}`}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          ref={(el) => (cardsRef.current[idx] = el)}
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{ zIndex: idx + 10 }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}

