import { useRef, useEffect, useState, useCallback } from "react";

type UseCarouselOptions = {
  reduced: boolean;
};

export function useCarousel({ reduced }: UseCarouselOptions) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);

  // Throttled scroll handler
  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const scrollLeft = track.scrollLeft;
    const scrollWidth = track.scrollWidth;
    const clientWidth = track.clientWidth;

    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 1);
    setProgressWidth((clientWidth / scrollWidth) * 100);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Initial state
    updateScrollState();

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateScrollState);
    };

    const handleResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateScrollState);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollState]);

  // Prev/Next handlers
  const handlePrev = useCallback(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width || 370;
    const gap = 20; // gap-5 = 20px

    track.scrollBy({
      left: -(cardWidth + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  }, [reduced]);

  const handleNext = useCallback(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width || 370;
    const gap = 20; // gap-5 = 20px

    track.scrollBy({
      left: cardWidth + gap,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [reduced]);

  // Drag to scroll (pointer devices with hover only)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let pointerMoved = false;

    const handlePointerDown = (e: PointerEvent) => {
      isDown = true;
      pointerMoved = false;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;

      // Track if pointer moved more than 6px
      if (Math.abs(x - startX) > 6) {
        pointerMoved = true;
      }
    };

    const handlePointerUp = () => {
      isDown = false;
      track.style.cursor = "grab";

      // If not moved much, allow link clicks
      // Link clicks are suppressed if pointerMoved is true (handled in card)
    };

    const handlePointerLeave = () => {
      isDown = false;
      track.style.cursor = "grab";
    };

    track.addEventListener("pointerdown", handlePointerDown);
    track.addEventListener("pointermove", handlePointerMove);
    track.addEventListener("pointerup", handlePointerUp);
    track.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      track.removeEventListener("pointerdown", handlePointerDown);
      track.removeEventListener("pointermove", handlePointerMove);
      track.removeEventListener("pointerup", handlePointerUp);
      track.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduced]);

  // Keyboard navigation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    track.addEventListener("keydown", handleKeyDown);

    return () => {
      track.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrev, handleNext]);

  // Wheel to horizontal scroll (only with Shift)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      track.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return {
    trackRef,
    canPrev,
    canNext,
    handlePrev,
    handleNext,
    progressWidth,
  };
}
