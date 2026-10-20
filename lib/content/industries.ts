// CONFIRM: these are industries ORYNTAL builds for (capability), not claims of past clients. Edit freely; the layout adapts to any count.

import {
  Building2,
  GraduationCap,
  Handshake,
  Briefcase,
  Rocket,
  ShoppingCart,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  id: string;
  name: string;
  icon: LucideIcon;
};

/** Order matters: the arc and the reduced-motion layout follow this list. */
export const industries: Industry[] = [
  { id: "real-estate", name: "Real Estate", icon: Building2 },
  { id: "b2b", name: "B2B", icon: Handshake },
  { id: "startups", name: "Startups", icon: Rocket },
  { id: "e-commerce", name: "E-Commerce", icon: ShoppingCart },
  { id: "local-businesses", name: "Local Businesses", icon: Store },
  { id: "service-providers", name: "Service Providers", icon: Briefcase },
  { id: "healthcare", name: "Healthcare & Clinics", icon: Stethoscope },
  { id: "logistics", name: "Logistics & Supply Chain", icon: Warehouse },
  { id: "education", name: "Education & Coaching", icon: GraduationCap },
  { id: "food-hospitality", name: "Food & Hospitality", icon: UtensilsCrossed },
];
