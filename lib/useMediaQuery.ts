"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * `useLayoutEffect` warns when it runs on the server, so it is only used in
 * the browser. The layout effect lets the media query resolve before the
 * browser paints the first client frame, which avoids a layout flash.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * SSR-safe media query hook.
 *
 * Returns `false` on the server and during the first client render, so the
 * markup React hydrates always matches the server output. The real value
 * lands right after hydration, before paint.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);

    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
