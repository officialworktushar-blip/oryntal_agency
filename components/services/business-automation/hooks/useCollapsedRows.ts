"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Options = {
  collapsedRows: number;
  gapY?: number;
  extra?: number;
};

export function useCollapsedRows({
  collapsedRows,
  gapY = 12,
  extra = 6,
}: Options) {
  const gridRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [rowTops, setRowTops] = useState<number[]>([]);

  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = Array.from(grid.children) as HTMLElement[];
    if (items.length === 0) return;

    const tops = items.map((item) => Math.round(item.offsetTop));
    const distinct = Array.from(new Set(tops)).sort((a, b) => a - b);
    setRowTops(distinct);

    const targetTop = distinct[collapsedRows - 1] ?? distinct[distinct.length - 1];
    const visible = items.filter((item) => tops[items.indexOf(item)] === targetTop).length;
    const lastVisibleItems = items.filter((item) => tops[items.indexOf(item)] <= targetTop);
    const last = lastVisibleItems[lastVisibleItems.length - 1];
    const collapsed =
      last && targetTop !== undefined ? last.offsetTop + last.offsetHeight + extra : null;

    setCollapsedHeight(collapsed);
    setFullHeight(grid.scrollHeight);
    setVisibleCount(items.filter((item) => tops[items.indexOf(item)] <= targetTop).length);

    if (distinct.length <= collapsedRows) {
      setExpanded(true);
    }
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
    const itemObserver = new MutationObserver(measure);
    itemObserver.observe(grid, { childList: true, attributes: true });

    return () => {
      observer.disconnect();
      itemObserver.disconnect();
    };
  }, [measure]);

  const toggle = useCallback(() => {
    setExpanded((value) => {
      if (value) {
        const panel = gridRef.current?.closest<HTMLElement>("section");
        if (panel) {
          const rect = panel.getBoundingClientRect();
          if (rect.top < 0) {
            panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }
        }
      }
      return !value;
    });
  }, []);

  return {
    gridRef,
    expanded,
    toggle,
    collapsedHeight,
    fullHeight,
    visibleCount,
    totalCount: gridRef.current?.children.length ?? 0,
    rowTops,
    hasMore: (rowTops.length || 0) > collapsedRows,
  };
}
