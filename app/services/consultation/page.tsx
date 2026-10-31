import type { Metadata } from "next";
import ConsultationContent from "@/components/services/consultation/ConsultationContent";

export const metadata: Metadata = {
  title: "Custom Business Consultation & Development | ORYNTAL",
  description:
    "A three-month engagement to understand your business, build the right solution, and launch with confidence. No technical knowledge needed.",
  alternates: {
    canonical: "/services/consultation",
  },
  openGraph: {
    title: "Custom Business Consultation & Development | ORYNTAL",
    description:
      "A three-month engagement to understand your business, build the right solution, and launch with confidence. No technical knowledge needed.",
  },
  twitter: {
    title: "Custom Business Consultation & Development | ORYNTAL",
    description:
      "A three-month engagement to understand your business, build the right solution, and launch with confidence. No technical knowledge needed.",
  },
};

export default function ConsultationPage() {
  return <ConsultationContent />;
}
