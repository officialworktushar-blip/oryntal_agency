import type { Metadata } from "next";
import QR2ReviewHero from "@/components/QR2ReviewHero";
import QR2ReviewFeatures from "@/components/QR2ReviewFeatures";

const title = "QR2 Review | ORYNTAL";
const description =
  "Let customers scan a QR code and leave a review in seconds. Connect Google, Trustpilot, Airbnb, 99acres, Etsy and more.";
const canonical = "/services/individual-services/qr2-review";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

export default function QR2ReviewPage() {
  return (
    <main>
      <QR2ReviewHero />
      <QR2ReviewFeatures />
    </main>
  );
}
