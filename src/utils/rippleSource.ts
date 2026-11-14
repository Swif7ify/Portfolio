function cssRgb(name: string) {
  if (typeof document === "undefined") return "rgb(20,20,18)";
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!v) return "rgb(20,20,18)";
  return `rgb(${v.split(/\s+/).join(",")})`;
}

/** Paints the poster that sits under the water, using the active theme tokens. */
export function drawRippleSource(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const bg = cssRgb("--surface");
  const fg = cssRgb("--fg");
  const accent = cssRgb("--accent");
  const muted = cssRgb("--muted");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = muted;
  ctx.globalAlpha = 0.22;
  ctx.lineWidth = 0.5;
  const step = 14;
  for (let x = 0; x <= w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(w * 0.78, h * 0.32, Math.min(w, h) * 0.16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const size = Math.min(w * 0.22, h * 0.5);
  ctx.font = `900 ${size}px "Roboto Flex", sans-serif`;
  ctx.fillText("REFLECT", w / 2, h * 0.56);

  ctx.font = `500 ${Math.max(7, size * 0.07)}px "JetBrains Mono", monospace`;
  ctx.textAlign = "left";
  ctx.fillStyle = muted;
  ctx.fillText("HEIGHTFIELD 2D WAVE SIMULATION · REFRACTION + CAUSTICS", 12, h - 14);
  ctx.textAlign = "right";
  ctx.fillText("EARL // DISCOVERY", w - 12, 16);
}
