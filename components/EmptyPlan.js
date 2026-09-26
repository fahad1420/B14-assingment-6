import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EmptyPlan({ tab }) {
  return (
    <section className="grid min-h-[300px] place-items-center border border-[#232732] bg-[#111317] px-6 py-14 text-center">
      <div>
        <h2 className="font-display text-xl font-bold uppercase tracking-wide">NOTHING HERE YET</h2>
        <p className="mt-2 text-xs leading-5 text-muted">
          {tab === "plan" ? "Browse the library and add a lift to get today moving." : "Save a workout for later and it will appear here."}
        </p>
        <Link href="/#library" className="mt-7 inline-flex items-center gap-2 bg-acid px-5 py-3 text-xs font-semibold text-[#0c0d10]">
          Go to workouts <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
