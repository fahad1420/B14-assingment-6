export default function PlanMetrics({ plan }) {
  const metrics = [
    ["Exercises", plan.length],
    ["Minutes", plan.reduce((total, item) => total + Number(item.duration || 0), 0)],
    ["Calories", plan.reduce((total, item) => total + Number(item.caloriesBurned || 0), 0)],
  ];

  return (
    <section className="grid overflow-hidden border border-[#232732] bg-[#13161d] sm:grid-cols-3">
      {metrics.map(([label, value], index) => (
        <div key={label} className={`px-6 py-7 ${index ? "border-t border-[#232732] sm:border-l sm:border-t-0" : ""}`}>
          <p className="text-xs text-muted">{label}</p>
          <p className="mt-1 font-display text-4xl font-bold">{value}</p>
        </div>
      ))}
    </section>
  );
}
