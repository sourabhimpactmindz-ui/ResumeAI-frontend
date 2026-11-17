import { useLayoutEffect, useRef, useState } from "react";

const A4_WIDTH = 794; 

export default function ScaledPreview({ children, className = "" }) {
  const box = useRef(null);
  const [scale, setScale] = useState(0.3);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / A4_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className={className}
      style={{ position: "relative", width: "100%", aspectRatio: "794 / 1123", overflow: "hidden", background: "#fff" }}
    >
      <div style={{ width: A4_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none" }}>
        {children}
      </div>
    </div>
  );
}