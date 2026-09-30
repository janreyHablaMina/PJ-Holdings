"use client";

import { useEffect, useRef, useState } from "react";

export function useSectionProgress() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let visible = false;

    const update = () => {
      frameId = 0;
      const scrollable = section.offsetHeight - window.innerHeight;
      setProgress(scrollable <= 0
        ? 0
        : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable)));
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    const syncScrollListener = () => {
      window.removeEventListener("scroll", requestUpdate);
      if (visible ) {
        window.addEventListener("scroll", requestUpdate, { passive: true });
      }
      requestUpdate();
    };

    // No scroll measurements while the banner is outside the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncScrollListener();
    });
    observer.observe(section);
    requestUpdate();
    window.addEventListener("resize", requestUpdate);
    motionPreference.addEventListener("change", syncScrollListener);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      motionPreference.removeEventListener("change", syncScrollListener);
    };
  }, []);

  return { sectionRef, progress };
}
