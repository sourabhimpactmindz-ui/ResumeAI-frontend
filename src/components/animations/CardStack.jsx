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
  const cardRefs = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || cards.length === 0 || reducedMotion) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl || idx === cards.length - 1) return;

        const nextCard = cardRefs.current[idx + 1];
        if (!nextCard) return;

        // When the next card slides up and approaches this card, scale and dim the current card
        gsap.to(cardEl, {
          scale: 0.94,
          opacity: 0.5,
          y: -15,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [cards, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-4xl mx-auto flex flex-col gap-10 pb-16 ${className}`}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          ref={(el) => (cardRefs.current[idx] = el)}
          className="sticky w-full will-change-transform transition-shadow duration-300"
          style={{
            top: `${100 + idx * 24}px`,
            zIndex: idx + 10,
          }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}


