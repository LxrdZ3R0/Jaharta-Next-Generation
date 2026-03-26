/** Strip HTML tags from user input */
export function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  const tmp = document.createElement("div");
  tmp.textContent = str;
  return tmp.innerHTML.trim().slice(0, 2000);
}

/** Compress image before Firebase upload */
export function compressImage(
  file: File,
  maxW = 1200,
  maxH = 1600,
  quality = 0.82
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/") || file.size < 300 * 1024) {
      resolve(file);
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture fichier échouée"));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Décodage image échoué"));
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        const ratio = Math.min(maxW / w, maxH / h, 1);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas context null")); return; }
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("toBlob échoué"))),
          "image/jpeg",
          quality
        );
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/** Detect link type from URL for display in card */
export function detectLinkType(url: string): {
  type: string;
  icon: string;
  color: string;
} {
  if (!url) return { type: "Lien", icon: "🔗", color: "#8a8fa8" };
  const l = url.toLowerCase();
  if (l.includes("docs.google.com/document"))
    return { type: "GDoc", icon: "📄", color: "#4285f4" };
  if (l.includes("sites.google.com"))
    return { type: "GSite", icon: "🌐", color: "#34a853" };
  if (l.includes("drive.google.com"))
    return { type: "GDrive", icon: "📁", color: "#f4b400" };
  if (l.endsWith(".pdf"))
    return { type: "PDF", icon: "📕", color: "#ea4335" };
  if (l.endsWith(".html") || l.endsWith(".htm"))
    return { type: "HTML", icon: "🖥️", color: "#00f0ff" };
  return { type: "Fiche", icon: "🔗", color: "#8a8fa8" };
}
