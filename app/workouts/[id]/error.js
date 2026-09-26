"use client";

import { RefreshCw } from "lucide-react";

export default function WorkoutError({ reset }) {
  return (
    <main className="container-shell grid min-h-[62vh] place-items-center py-16 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase">Unable to load workout</h1>
        <p className="mt-3 text-sm text-muted">The workout API did not respond successfully.</p>
        <button type="button" onClick={reset} className="mt-7 inline-flex items-center gap-2 bg-acid px-6 py-3 text-xs font-bold text-[#0c0d10]"><RefreshCw size={15} /> TRY AGAIN</button>
      </div>
    </main>
  );
}
