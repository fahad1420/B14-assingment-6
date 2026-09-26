import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutStats({ workout, compact = false }) {
  const iconSize = compact ? 13 : 14;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5"><Clock3 size={iconSize} className="text-acid" />{workout.duration} min</span>
      <span className="inline-flex items-center gap-1.5"><Flame size={iconSize} className="text-acid" />{workout.caloriesBurned} kcal</span>
      <span className="inline-flex items-center gap-1.5"><Star size={iconSize} className="text-acid" />{workout.rating}</span>
    </div>
  );
}
