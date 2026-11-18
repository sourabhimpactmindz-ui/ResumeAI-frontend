import { useLayoutEffect, useRef, useState } from "react";

const A4_WIDTH = 794; 


export default function ScaledPreview({ children, className = "", autoHeight = false }) {
  const box = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(0.3);
  const [height, setHeight] = useState(null);

  useLayoutEffect(() => {
    const el = box.current;
    const content = inner.current;
    if (!el || !content) return;

    const update = () => {
      const s = el.clientWidth / A4_WIDTH;
      setScale(s);
      if (autoHeight) setHeight(content.offsetHeight * s);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (autoHeight) ro.observe(content);
    return () => ro.disconnect();
  }, [autoHeight]);

  const boxStyle = autoHeight
    ? { position: "relative", width: "100%", height: height ?? "auto", overflow: "hidden", background: "#fff" }
    : { position: "relative", width: "100%", aspectRatio: "794 / 1123", overflow: "hidden", background: "#fff" };

  return (
    <div ref={box} className={className} style={boxStyle}>
      <div
        ref={inner}
        style={{ width: A4_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none" }}
      >
        {children}
      </div>
    </div>
  );
}