"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { useWorkouts } from "@/context/WorkoutContext";

export default function WorkoutActions({ workout }) {
  const { plan, saved, addToPlan, saveForLater } = useWorkouts();
  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);
  const planFull = plan.length >= 5 && !inPlan;

  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={inPlan || planFull}
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-acid px-6 text-sm font-semibold text-[#0c0d10] transition enabled:hover:bg-[#c2f800] disabled:cursor-not-allowed disabled:opacity-45"
      >
        <CalendarPlus size={18} /> {inPlan ? "In today's plan" : planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={isSaved}
        className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#374151] px-6 text-sm font-medium text-gray-100 transition enabled:hover:border-acid enabled:hover:text-acid disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Bookmark size={18} /> {isSaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
