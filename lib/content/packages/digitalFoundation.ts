import type { LucideIcon } from "lucide-react";
import { FileCheck2, Link2, ShieldCheck, UserPlus } from "lucide-react";
import { SiFacebook, SiGoogle, SiInstagram, SiWhatsapp } from "react-icons/si";

export type OrbitTile = {
  id: string;
  label: string;
  icon: LucideIcon | typeof SiWhatsapp;
  color: string;
  /** Tile centre, % of the stage. */
  x: number;
  y: number;
  /** Individual tilt in degrees, on top of the stage tilt. */
  tilt: number;
  /** Hidden on small screens (< md). */
  desktopOnly?: boolean;
};

export type DigitalFoundationContent = {
  slug: string;
  packageName: string;
  heroLine: string;
  price: number;
  priceLabel: string;
  priceNote: string;
  checklist: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustLine: string;
  feeNote: string;
  orbit: {
    centreSrc?: string;
    tiles: OrbitTile[];
  };
};

export const digitalFoundation: DigitalFoundationContent = {
  slug: "digital-foundation",
  packageName: "Digital Foundation Package",
  heroLine: "Everything you need to get online, live and connected.",
  price: 30000,
  priceLabel: "₹30,000",
  priceNote: "one-time",
  checklist: [
    "A professional website designed around your business",
    "Lead capture forms that turn visitors into enquiries",
    "WhatsApp and essential business links built in",
    "Basic automation for repetitive tasks, where feasible",
    "SSL/HTTPS and essential security set up from day one",
    "MSME/Udyam registration guidance, where applicable",
    "Digital setup guidance to get your business online right",
  ],
  primaryCta: {
    label: "Get started",
    href: "/contact?interest=digital-foundation-package",
  },
  secondaryCta: { label: "See what's included", href: "#included" },
  trustLine: "Clear scope and pricing before we start",
  feeNote: "Third-party services, if any, may carry separate provider fees.",
  orbit: {
    tiles: [
      {
        id: "whatsapp",
        label: "WhatsApp",
        icon: SiWhatsapp,
        color: "#25D366",
        x: 19,
        y: 52,
        tilt: -5,
      },
      {
        id: "google",
        label: "Google",
        icon: SiGoogle,
        color: "#4285F4",
        x: 27,
        y: 22,
        tilt: 6,
      },
      {
        id: "leads",
        label: "Lead capture",
        icon: UserPlus,
        color: "#B9A8FF",
        x: 50,
        y: 12,
        tilt: -4,
      },
      {
        id: "security",
        label: "SSL security",
        icon: ShieldCheck,
        color: "#2EC27E",
        x: 82,
        y: 17,
        tilt: 5,
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: SiInstagram,
        color: "#E4405F",
        x: 75,
        y: 38,
        tilt: -6,
      },
      {
        id: "facebook",
        label: "Facebook",
        icon: SiFacebook,
        color: "#1877F2",
        x: 88,
        y: 66,
        tilt: 4,
      },
      {
        id: "register",
        label: "MSME/Udyam guidance",
        icon: FileCheck2,
        color: "#FCB400",
        x: 13,
        y: 82,
        tilt: 6,
        desktopOnly: true,
      },
      {
        id: "links",
        label: "Business links",
        icon: Link2,
        color: "#B9A8FF",
        x: 64,
        y: 90,
        tilt: -5,
        desktopOnly: true,
      },
    ],
  },
};
