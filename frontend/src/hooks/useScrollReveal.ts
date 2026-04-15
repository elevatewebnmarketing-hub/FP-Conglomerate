import { useEffect, useRef, useState } from "react";

type ScrollRevealOptions = {
  /** Expand the root viewport for earlier triggers (e.g. "80px 0px"). */
  rootMargin?: string;
};

/**
 * @param threshold - Use `0` so any pixel in view counts (avoids sections stuck at opacity-0).
 */
export function useScrollReveal(threshold = 0.15, options?: ScrollRevealOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: options?.rootMargin ?? "0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, options?.rootMargin]);

  return { ref, isVisible };
}
