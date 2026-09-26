import Image from "next/image";
import Link from "next/link";
import WorkoutStats from "@/components/WorkoutStats";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workouts/${workout.id}`} className="group overflow-hidden border border-[#20242e] bg-[#15171d] transition duration-200 hover:-translate-y-1 hover:border-[#374151]" aria-label={`View ${workout.name} details`}>
      <div className="relative aspect-[1.75/1] overflow-hidden bg-[#1a1d24]">
        <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <article className="p-6">
        <div className="flex min-h-6 flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="rounded-full bg-acid px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0c0d10]">{group}</span>
          ))}
        </div>
        <h2 className="mt-4 font-display text-lg font-bold uppercase tracking-wide">{workout.name}</h2>
        <p className="mt-2 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-5 border-t border-[#232732] pt-4">
          <WorkoutStats workout={workout} />
        </div>
      </article>
    </Link>
  );
}
