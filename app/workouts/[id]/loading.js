export default function WorkoutDetailsLoading() {
  return (
    <main className="container-shell grid gap-12 py-12 lg:grid-cols-2">
      <div className="min-h-[520px] animate-pulse bg-[#171a21]" />
      <div className="space-y-6">
        <div className="h-12 w-3/4 animate-pulse bg-[#20242e]" />
        <div className="h-20 animate-pulse bg-[#15171d]" />
        <div className="h-[330px] animate-pulse bg-[#15171d]" />
      </div>
    </main>
  );
}
