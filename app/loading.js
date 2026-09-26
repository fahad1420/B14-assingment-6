export default function Loading() {
  return (
    <div className="container-shell grid min-h-[60vh] place-items-center">
      <div className="flex items-center gap-3 text-sm text-muted"><span className="h-5 w-5 animate-spin rounded-full border-2 border-[#374151] border-t-acid" />Loading workouts…</div>
    </div>
  );
}
