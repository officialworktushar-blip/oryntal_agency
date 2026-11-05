import { Suspense } from "react";
import ContactHero from "@/components/contact/ContactHero";
import EnquiryForm from "@/components/contact/EnquiryForm";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Suspense fallback={null}>
        <EnquiryForm />
      </Suspense>
    </>
  );
}
