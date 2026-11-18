import { useLayoutEffect, useRef, useState } from "react";

const A4_WIDTH = 794;  
const A4_HEIGHT = 1123;


export default function ScaledPreview({
  children,
  className = "",
  autoHeight = false,
  showPageBreaks = false,
}) {
  const box = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(0.3);
  const [contentHeight, setContentHeight] = useState(A4_HEIGHT);

  useLayoutEffect(() => {
    const el = box.current;
    const content = inner.current;
    if (!el || !content) return;

    const update = () => {
      setScale(el.clientWidth / A4_WIDTH);
      setContentHeight(content.offsetHeight);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (autoHeight) ro.observe(content);
    return () => ro.disconnect();
  }, [autoHeight]);

  const boxStyle = autoHeight
    ? { position: "relative", width: "100%", height: contentHeight * scale, overflow: "hidden", background: "#fff" }
    : { position: "relative", width: "100%", aspectRatio: "794 / 1123", overflow: "hidden", background: "#fff" };

  const pages = Math.max(1, Math.ceil((contentHeight - 6) / A4_HEIGHT));

  return (
    <div ref={box} className={className} style={boxStyle}>
      <div
        ref={inner}
        style={{ width: A4_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none" }}
      >
        {children}
      </div>

      {autoHeight && showPageBreaks && pages > 1 &&
        Array.from({ length: pages - 1 }, (_, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute", left: 0, right: 0, top: (i + 1) * A4_HEIGHT * scale,
              borderTop: "2px dashed rgba(13, 27, 42, 0.45)", pointerEvents: "none",
            }}
          >
            <span
              style={{
                position: "absolute", right: 8, top: 4, padding: "2px 10px", borderRadius: 999,
                background: "#0D1B2A", color: "#F4F1DE", fontSize: 11, fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Page {i + 2}
            </span>
          </div>
        ))}
    </div>
  );
}