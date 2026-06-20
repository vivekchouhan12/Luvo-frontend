import { useEffect, useRef } from "react";

export default function CanvasSequence({
  folder = "/birla-images",
  prefix = "ezgif-frame-",
  start = 1,
  end = 136,
  fps = 24,
  autoplay = false,
  initialIndex = 0,
  className = "absolute inset-0 w-full h-full",
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const rafRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false, antialias: true });
    let mounted = true;
    let loadedCount = 0;

    const pad = (n, z = 3) => String(n).padStart(z, "0");

    // Enable image smoothing for better quality
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    // Preload images with load event tracking
    const total = end - start + 1;
    imagesRef.current = new Array(total);
    for (let i = start; i <= end; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (mounted) loadedCount++;
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${folder}/${prefix}${pad(i)}.jpg`);
      };
      img.src = `${folder}/${prefix}${pad(i)}.jpg`;
      imagesRef.current[i - start] = img;
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawFrame(frameRef.current);
    }

    function drawFrame(index) {
      const img = imagesRef.current[index];
      if (!img || !img.complete || !ctx) return;
      
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const iw = img.naturalWidth || img.width || cw;
      const ih = img.naturalHeight || img.height || ch;

      if (iw === 0 || ih === 0) return;

      // cover scale with sub-pixel precision
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, w, h);
    }

    let lastTime = performance.now();
    const msPerFrame = 1000 / fps;

    function tick(t) {
      if (!mounted || !autoplay) return;
      if (t - lastTime >= msPerFrame) {
        frameRef.current = (frameRef.current + 1) % total;
        drawFrame(frameRef.current);
        lastTime = t;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const idx = Math.floor(progress * (total - 1));
      frameRef.current = idx;
      drawFrame(frameRef.current);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    frameRef.current = Math.min(total - 1, Math.max(0, initialIndex));
    resize();
    if (autoplay) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      // draw the initial frame without autoplay
      drawFrame(frameRef.current);
    }

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [folder, prefix, start, end, fps, autoplay, initialIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
