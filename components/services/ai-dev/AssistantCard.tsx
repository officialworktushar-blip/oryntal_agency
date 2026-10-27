import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import {
  getAssistantHref,
  type AiDevAssistant,
  type AiDevAssistants,
} from "@/lib/content/services/aiDev";

type AssistantCardProps = {
  assistant: AiDevAssistant;
  subscription: AiDevAssistants["subscription"];
  linkLabel: string;
  shotHint: string;
  duplicate?: boolean;
};

export default function AssistantCard({
  assistant,
  subscription,
  linkLabel,
  shotHint,
  duplicate = false,
}: AssistantCardProps) {
  return (
    <article
      aria-hidden={duplicate || undefined}
      className={cn(
        "as-card flex w-[285px] flex-none flex-col rounded-[24px] p-3 md:w-[330px] lg:w-[360px]",
        duplicate && "as-dup"
      )}
      style={{ backgroundColor: assistant.bg }}
    >
      <div className="relative">
        <MediaPlaceholder
          variant="shot"
          type="image"
          aspect="1/1"
          label={assistant.shotLabel}
          hint={shotHint}
          src={assistant.src}
          alt={assistant.alt}
          icon={assistant.icon}
          tint={assistant.bg}
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 330px, 285px"
          className="w-full rounded-[16px]"
        />
        {subscription.enabled ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#1D1E20] shadow-[0_4px_12px_rgba(20,20,60,0.10)] backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#F5A623]" />
            {subscription.availabilityTag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.01em] text-[#1D1E20]">
          {assistant.name}
        </h3>
        <p className="mt-2 min-h-[4.875em] text-[15px] leading-relaxed text-[#1D1E20]/[0.72]">
          {assistant.outcome}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {assistant.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-[12px] font-medium text-[#1D1E20]/80"
            >
              {tag}
            </li>
          ))}
          {subscription.enabled ? (
            <li className="inline-flex items-center gap-1 rounded-full bg-[#673DE6] px-3 py-1 text-[12px] font-semibold text-white">
              <Sparkles size={12} aria-hidden="true" />
              {subscription.chip}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-5">
          <div className="border-t border-black/[0.08] pt-4">
            <Link
              href={getAssistantHref(assistant.id)}
              tabIndex={duplicate ? -1 : undefined}
              className="group/link flex items-center justify-between rounded-md text-[15px] font-semibold text-[#673DE6] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#673DE6] focus-visible:ring-offset-2"
            >
              <span>
                {linkLabel}
                <span className="sr-only">: {assistant.name}</span>
              </span>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/link:-translate-y-[3px] group-hover/link:translate-x-[3px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
