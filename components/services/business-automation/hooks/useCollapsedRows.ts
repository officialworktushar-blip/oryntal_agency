"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

type Options = {
  collapsedRows: number;
  extra?: number;
};

/**
 * Measures the grid rows so the panel can clip to the first `collapsedRows`.
 * Until the first measurement the CSS fallback in Connect.tsx keeps three
 * rows visible, so nothing depends on JS to appear.
 */
export function useCollapsedRows({ collapsedRows, extra = 6 }: Options) {
  const gridRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState(0);
  const [visibleCount, setVisibleCount] = useState(collapsedRows * 2);
  const [rowTops, setRowTops] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = Array.from(grid.children) as HTMLElement[];
    if (items.length === 0) return;

    const tops = items.map((item) => Math.round(item.offsetTop));
    const distinct = Array.from(new Set(tops)).sort((a, b) => a - b);
    const targetTop = distinct[collapsedRows - 1] ?? distinct[distinct.length - 1];

    const firstRows = items.filter((item) => item.offsetTop <= targetTop);
    const last = firstRows[firstRows.length - 1];

    setRowTops(distinct);
    setVisibleCount(firstRows.length);
    setHasMore(distinct.length > collapsedRows);
    setCollapsedHeight(
      last ? last.offsetTop + last.offsetHeight + extra : null,
    );

    const lastItem = items[items.length - 1];
    setFullHeight(
      Math.max(
        grid.scrollHeight,
        grid.offsetHeight,
        lastItem.offsetTop + lastItem.offsetHeight,
      ),
    );
  }, [collapsedRows, extra]);

  useLayoutEffect(() => {
    measure();

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => measure());
    }

    const grid = gridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(measure);
    observer.observe(grid);

    return () => observer.disconnect();
  }, [measure]);

  return {
    gridRef,
    expanded,
    setExpanded,
    collapsedHeight,
    fullHeight,
    visibleCount,
    rowTops,
    hasMore,
    measure,
  };
}
