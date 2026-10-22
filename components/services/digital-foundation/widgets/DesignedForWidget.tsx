"use client";

import Gauge from "./Gauge";

type DesignedForWidgetProps = {
  className?: string;
};

export default function DesignedForWidget({ className }: DesignedForWidgetProps) {
  return (
    <div
      className={`dfd-widget h-[196px] w-[195px] ${className ?? ""}`}
      aria-hidden="true"
    >
      <Gauge
        label="Built around"
        centerText="You"
        sub="your business"
        color="purple"
        className="absolute left-[34px] top-[35px]"
      />
    </div>
  );
}
