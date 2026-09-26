import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container-shell grid min-h-[62vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <Dumbbell size={42} className="mx-auto text-acid" />
        <p className="mt-6 text-xs font-bold tracking-[0.2em] text-acid">404 — NOT FOUND</p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase">THIS ROUTE MISSED THE REP</h1>
        <p className="mt-4 text-sm leading-6 text-muted">The page or workout you requested does not exist.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 bg-acid px-6 py-3 text-xs font-bold text-[#0c0d10]">
          <ArrowLeft size={15} /> BACK TO WORKOUTS
        </Link>
      </div>
    </main>
  );
}
