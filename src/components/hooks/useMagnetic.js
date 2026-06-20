import { useEffect, useRef } from "react";

/**
 * useMagnetic: subtle magnetic effect for hover targets.
 * Strength: 0.08 by default; clamped to ~6–8px movement.
 */
export default function useMagnetic(strength = 0.08, max = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rect = el.getBoundingClientRect();
    let raf = null;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const onMove = (e) => {
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      const clampedX = Math.max(Math.min(dx, max), -max);
      const clampedY = Math.max(Math.min(dy, max), -max);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, max]);

  return ref;
}
