import Link from "next/link";
import { Compass } from "lucide-react";

type LogoProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Logo({ className, onNavigate }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="ORYNTAL home"
      className={`group inline-flex items-center ${className ?? ""}`}
    >
      {/*
        Brand lockup. Gradient uses the main brand color (#835FF5 / brand-600)
        with the lighter companion (#8A66FA / brand-500); the wordmark and the
        inner border are pure white (#FFFFFF).

        To swap in the real asset, replace the inner <span> with:
        <Image src="/oryntal-logo.png" alt="ORYNTAL" width={160} height={40} priority />
        Required asset: transparent PNG/SVG of the ORYNTAL lockup using white
        text and a white inner border on the brand gradient.
      */}
      <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-3 py-2 shadow-cta transition-transform duration-200 group-hover:scale-[1.03]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1 rounded-[0.7rem] border border-white"
        />
        <Compass className="h-5 w-5 text-white" strokeWidth={2.4} />
        <span className="text-base font-extrabold leading-none tracking-tight text-white">
          ORYNTAL
        </span>
      </span>
    </Link>
  );
}

export default Logo;
