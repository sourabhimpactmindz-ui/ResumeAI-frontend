const A4_W = 595.28; 
const A4_H = 841.89;

export async function downloadElementAsPdf(element, filename = "resume.pdf") {
  if (!element) throw new Error("Nothing to export");

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  if (document.fonts?.ready) await document.fonts.ready;

  const canvas = await html2canvas(element, {
    scale: 2,                    
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: 794,
    
    onclone: (_doc, el) => {
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.top = "0";
    },
  });

  const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
  const pageHeightPx = Math.floor(canvas.width * (A4_H / A4_W));
  const pages = Math.max(1, Math.ceil((canvas.height - 6) / pageHeightPx)); 

  for (let i = 0; i < pages; i++) {
    const sy = i * pageHeightPx;
    const sh = Math.min(pageHeightPx, canvas.height - sy);

    const page = document.createElement("canvas");
    page.width = canvas.width;
    page.height = pageHeightPx;
    const ctx = page.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, page.width, page.height);
    ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);

    if (i > 0) pdf.addPage();
    pdf.addImage(page.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, A4_W, A4_H);
  }

  pdf.save(filename);
}