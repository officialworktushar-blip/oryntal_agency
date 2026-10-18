import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        This page went off-course
      </h1>
      <p className="mt-4 max-w-md text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>
    </section>
  );
}
