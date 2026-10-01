"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.15,
  className = "",
  as: Component = "div",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationClasses = () => {
    switch (animation) {
      case "fade-up":
        return isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-10 blur-[2px]";
      case "fade-down":
        return isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 -translate-y-10 blur-[2px]";
      case "fade-left":
        return isVisible
          ? "opacity-100 translate-x-0 blur-0"
          : "opacity-0 translate-x-10 blur-[2px]";
      case "fade-right":
        return isVisible
          ? "opacity-100 translate-x-0 blur-0"
          : "opacity-0 -translate-x-10 blur-[2px]";
      case "zoom-in":
        return isVisible
          ? "opacity-100 scale-100 blur-0"
          : "opacity-0 scale-95 blur-[2px]";
      case "fade":
      default:
        return isVisible ? "opacity-100 blur-0" : "opacity-0 blur-[2px]";
    }
  };

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-[opacity,transform,filter] will-change-[opacity,transform] ${getAnimationClasses()} ${className}`}
    >
      {children}
    </Component>
  );
}
