import { useLayoutEffect, useRef, useState } from "react";

const A4_WIDTH = 794; 
const A4_HEIGHT = 1123;


export default function ScaledPreview({
  children,
  className = "",
  autoHeight = false,
  fitViewport = false,
  reserve = 225,
  showPageBreaks = false,
}) {
  const wrap = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(0.3);
  const [contentHeight, setContentHeight] = useState(A4_HEIGHT);

  useLayoutEffect(() => {
    const el = wrap.current;
    const content = inner.current;
    if (!el || !content) return;

    const update = () => {
      const h = content.offsetHeight;
      let s = el.clientWidth / A4_WIDTH;
      if (fitViewport && window.innerWidth > 900) {
        const maxH = Math.max(320, window.innerHeight - reserve);
        s = Math.min(s, maxH / h);
      }
      setScale(s);
      setContentHeight(h);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(content);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [fitViewport, reserve]);

  const tall = autoHeight || fitViewport;
  const boxStyle = tall
    ? {
        position: "relative",
        width: fitViewport ? A4_WIDTH * scale : "100%",
        height: contentHeight * scale,
        margin: "0 auto",
        overflow: "hidden",
        background: "#fff",
      }
    : { position: "relative", width: "100%", aspectRatio: "794 / 1123", overflow: "hidden", background: "#fff" };

  const pages = Math.max(1, Math.ceil((contentHeight - 6) / A4_HEIGHT));

  return (
    <div ref={wrap} style={{ width: "100%" }}>
      <div className={className} style={boxStyle}>
        <div
          ref={inner}
          style={{ width: A4_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left", pointerEvents: "none" }}
        >
          {children}
        </div>

        {tall && showPageBreaks && pages > 1 &&
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
    </div>
  );
}