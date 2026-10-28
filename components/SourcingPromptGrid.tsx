"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  Handshake,
  ListChecks,
  Package,
  Search,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";

type PromptCard = {
  id: string;
  title: string;
  text: string;
  prompt: string;
  icon: typeof Truck;
};

const CARDS: PromptCard[] = [
  {
    id: "delivery",
    title: "Delivery and logistics",
    text: "Get guidance on connecting courier and delivery services to your orders.",
    prompt: "Which delivery services can I connect to my online store?",
    icon: Truck,
  },
  {
    id: "packaging",
    title: "Packaging",
    text: "Practical information and advice on packaging for your products.",
    prompt: "What kind of packaging should I use for fragile products?",
    icon: Package,
  },
  {
    id: "suppliers",
    title: "Supplier connections",
    text: "Get connected with suppliers and wholesalers that suit your business.",
    prompt: "I run a candle business. Can you connect me with suppliers for wax and jars?",
    icon: Handshake,
  },
  {
    id: "partners",
    title: "Sourcing partners",
    text: "Get help identifying the right sourcing partners for what you sell.",
    prompt: "Help me find a sourcing partner for my product range.",
    icon: Search,
  },
  {
    id: "wholesale",
    title: "Wholesale opportunities",
    text: "Get access to available supplier contacts and possible wholesale opportunities.",
    prompt: "Share the wholesale contacts available for my product category.",
    icon: Store,
  },
  {
    id: "terms",
    title: "Order quantities and terms",
    text: "Understand minimum order quantities, availability and terms before you commit. Final terms are set by each supplier.",
    prompt: "What should I check about minimum order quantities before ordering?",
    icon: ListChecks,
  },
];

export default function SourcingPromptGrid() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleCopy(prompt: string, id: string) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(prompt);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = prompt;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedId(id);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  return (
    <section
      aria-label="Sourcing and operations questions"
      style={{ backgroundColor: "#0d0d0f" }}
      className="text-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-[36px] sm:text-[56px] font-medium tracking-tight leading-[1.1] text-white">
            Everything behind your orders, one message away
          </h2>
          <p className="mt-5 text-base lg:text-lg text-white/70 max-w-[720px] mx-auto leading-relaxed">
            Not sure where to start? Copy a message below and send it to us. We will guide you on delivery, packaging and suppliers.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon;
            const isCopied = copiedId === card.id;

            return (
              <div
                key={card.id}
                className="flex flex-col rounded-3xl p-7 lg:p-8 min-h-[340px] border border-white/5 hover:border-white/15 transition-colors"
                style={{ backgroundColor: "#1a1a1d" }}
              >
                <div
                  className="h-[50px] w-[50px] rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#2a2a31" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#8b7cf6" }} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-normal text-white">{card.title}</h3>
                <p className="mt-3 text-lg text-white/70 leading-relaxed">{card.text}</p>

                <div className="mt-auto pt-8">
                  <div
                    className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
                    style={{ backgroundColor: "#232328" }}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <Sparkles className="h-[18px] w-[18px] text-white/80 shrink-0 mt-0.5" aria-hidden="true" />
                      <p
                        className="text-base text-white leading-snug line-clamp-2"
                        title={card.prompt}
                      >
                        {card.prompt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(card.prompt, card.id)}
                      className="flex items-center gap-2 text-[#8b7cf6] font-medium hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cf6]/60 rounded-md transition-colors"
                      aria-label={`Copy message: ${card.prompt}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-[18px] w-[18px]" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-[18px] w-[18px]" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact?interest=business-operations-and-sourcing-support"
            className="inline-flex items-center bg-[#673DE6] hover:bg-[#5a33cf] text-white rounded-xl px-8 py-4 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
          >
            Send us your question
          </Link>
          <p className="mt-6 text-sm text-white/50 max-w-[640px] mx-auto leading-relaxed">
            Supplier pricing, minimum order quantities (MOQs), availability and terms are decided by each supplier. ORYNTAL can connect you with suitable contacts, but specific prices or savings cannot be guaranteed.
          </p>
        </div>

        <div aria-live="polite" className="sr-only">
          {copiedId && "Message copied"}
        </div>
      </div>
    </section>
  );
}
