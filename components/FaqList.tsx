"use client";

import { useId, useState } from "react";

type FaqItem = {
  q: string;
  a: string;
};

type FaqListProps = {
  items: FaqItem[];
};

export default function FaqList({ items }: FaqListProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="fl-faq-list relative">
      <style>{`
        .fl-faq-panel {
          display: grid;
          grid-template-rows: 0fr;
          overflow: hidden;
        }
        .fl-faq-panel[data-open="true"] {
          grid-template-rows: 1fr;
        }
        .fl-faq-answer {
          opacity: 0;
        }
        .fl-faq-panel[data-open="true"] .fl-faq-answer {
          opacity: 1;
        }
        .fl-faq-plus-vertical {
          transform-origin: center;
        }
        .fl-faq-button[data-open="true"] .fl-faq-plus-vertical {
          transform: scaleY(0);
        }

        @media (prefers-reduced-motion: no-preference) {
          .fl-faq-panel {
            transition: grid-template-rows 300ms cubic-bezier(0.2, 0.7, 0.2, 1);
          }
          .fl-faq-answer {
            transition: opacity 300ms cubic-bezier(0.2, 0.7, 0.2, 1);
          }
          .fl-faq-plus-vertical {
            transition: transform 250ms ease;
          }
        }
      `}</style>

      <ul className="border-t border-white/10">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `${baseId}-faq-button-${index}`;
          const panelId = `${baseId}-faq-panel-${index}`;

          return (
            <li key={item.q} className="border-b border-white/10">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                data-open={isOpen ? "true" : "false"}
                onClick={() =>
                  setOpenIndex((current) =>
                    current === index ? null : index,
                  )
                }
                className="fl-faq-button group flex w-full items-center justify-between gap-6 rounded-lg py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7bff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="text-[18px] font-normal leading-snug text-white/90 transition-colors duration-200 group-hover:text-white md:text-[22px]">
                  {item.q}
                </span>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="size-5 shrink-0 text-white/65 transition-colors duration-200 group-hover:text-white"
                >
                  <line x1="4" y1="10" x2="16" y2="10" />
                  <line
                    className="fl-faq-plus-vertical"
                    x1="10"
                    y1="4"
                    x2="10"
                    y2="16"
                  />
                </svg>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                data-open={isOpen ? "true" : "false"}
                inert={!isOpen}
                className="fl-faq-panel"
              >
                <div className="overflow-hidden">
                  <p className="fl-faq-answer max-w-[900px] pb-7 text-[18px] leading-[1.65] text-white/70">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
