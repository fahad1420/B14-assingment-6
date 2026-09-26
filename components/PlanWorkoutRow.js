import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import WorkoutStats from "@/components/WorkoutStats";

export default function PlanWorkoutRow({ workout, tab, onDone, onRemove }) {
  return (
    <article className={`grid gap-5 border border-[#232732] bg-[#14171e] p-4 transition lg:grid-cols-[130px_1fr_auto] lg:items-center ${workout.done ? "opacity-55" : ""}`}>
      <div className="relative aspect-[1.8/1] overflow-hidden bg-[#1a1d24] lg:aspect-auto lg:h-[82px]">
        <Image src={workout.image} alt="" fill sizes="130px" className="object-cover" />
      </div>

      <div className="min-w-0">
        <h2 className={`font-display text-base font-bold uppercase tracking-wide ${workout.done ? "line-through" : ""}`}>{workout.name}</h2>
        <p className="mt-1 text-xs font-medium text-muted">{workout.equipment}</p>
        <div className="mt-3"><WorkoutStats workout={workout} compact /></div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        <Link href={`/workouts/${workout.id}`} className="inline-flex h-9 w-full items-center justify-center border border-[#374151] px-4 sm:w-auto text-xs text-gray-200 transition hover:border-acid hover:text-acid">
          View Details
        </Link>
        {tab === "plan" && (
          <button type="button" onClick={() => onDone(workout.id)} className={`inline-flex h-9 w-full items-center justify-center gap-2 px-4 sm:w-auto text-xs font-semibold transition ${workout.done ? "border border-acid text-acid" : "bg-acid text-[#0c0d10] hover:bg-[#c2f800]"}`}>
            <Check size={15} /> {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button type="button" onClick={() => onRemove(workout.id)} aria-label={`Remove ${workout.name}`} className="grid h-9 w-9 place-items-center border border-[#374151] text-muted transition hover:border-red-500 hover:text-red-400">
          <X size={16} />
        </button>
      </div>
    </article>
  );
}
