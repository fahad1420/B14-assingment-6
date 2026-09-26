"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import LoadingGrid from "@/components/LoadingGrid";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [query, setQuery] = useState("");

  const loadWorkouts = async (signal) => {
    setStatus("loading");
    try {
      const response = await fetch(API_URL, { signal });
      if (!response.ok) throw new Error("Failed to load workouts");
      const data = await response.json();
      setWorkouts(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (error) {
      if (error.name !== "AbortError") setStatus("error");
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    // Initial client fetch intentionally drives the loading state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadWorkouts(controller.signal);
    return () => controller.abort();
  }, []);

  const filteredWorkouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return workouts;
    return workouts.filter((workout) =>
      workout.name.toLowerCase().includes(normalizedQuery)
      || workout.muscleGroups.some((group) => group.toLowerCase().includes(normalizedQuery)),
    );
  }, [query, workouts]);

  return (
    <section id="library" className="container-shell scroll-mt-28 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">THE LIBRARY</h2>
          <p className="mt-2 text-sm text-muted">Twelve lifts covering every major muscle group.</p>
        </div>
        <label className="relative block w-full sm:max-w-[280px]">
          <span className="sr-only">Search workouts by name or tag</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name or tag"
            className="h-10 w-full border border-[#374151] bg-[#0f1115] pl-10 pr-3 text-sm text-gray-100 placeholder:text-[#6b7280]"
          />
        </label>
      </div>

      {status === "loading" && <LoadingGrid />}
      {status === "error" && (
        <div className="border border-[#2d313b] bg-panel px-6 py-12 text-center">
          <h3 className="font-display text-xl font-bold uppercase">Unable to load workouts</h3>
          <p className="mt-2 text-sm text-muted">Check your connection and try again.</p>
          <button onClick={() => loadWorkouts()} className="mt-6 bg-acid px-5 py-3 text-xs font-bold text-[#0c0d10]">TRY AGAIN</button>
        </div>
      )}
      {status === "success" && workouts.length === 0 && (
        <p className="border border-[#2d313b] bg-panel p-8 text-center text-sm text-muted">No workouts are available right now.</p>
      )}
      {status === "success" && workouts.length > 0 && filteredWorkouts.length === 0 && (
        <div className="border border-[#2d313b] bg-panel p-10 text-center">
          <h3 className="font-display text-xl font-bold uppercase">NO WORKOUTS FOUND</h3>
          <p className="mt-2 text-sm text-muted">Try a different workout name or muscle-group tag.</p>
        </div>
      )}
      {status === "success" && filteredWorkouts.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
        </div>
      )}
    </section>
  );
}
