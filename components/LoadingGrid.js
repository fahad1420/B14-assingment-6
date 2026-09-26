export default function LoadingGrid() {
  return (
    <div role="status" aria-live="polite">
      <div className="mb-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#374151] border-t-acid" />
        Loading workouts…
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse border border-[#20242e] bg-panel">
            <div className="aspect-[1.75/1] bg-[#1a1d24]" />
            <div className="space-y-4 p-6">
              <div className="h-5 w-28 bg-[#232732]" />
              <div className="h-6 w-3/4 bg-[#232732]" />
              <div className="h-4 w-1/2 bg-[#232732]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
