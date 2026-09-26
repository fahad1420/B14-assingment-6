import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "@/components/WorkoutActions";
import { getWorkout, getWorkouts } from "@/lib/api";

export const dynamicParams = false;

export const revalidate = 3600;

export async function generateStaticParams() {
  const workouts = await getWorkouts();
  return workouts.map((workout) => ({ id: String(workout.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return { title: "Workout Not Found" };
  const workout = await getWorkout(id);
  return workout ? { title: workout.name, description: workout.description } : { title: "Workout Not Found" };
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const workout = await getWorkout(id);
  if (!workout) notFound();

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating],
  ];

  return (
    <main className="container-shell py-12">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
        <section className="relative min-h-[360px] overflow-hidden sm:min-h-[420px] bg-[#171a21] lg:sticky lg:top-32 lg:min-h-[735px]">
          <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        </section>

        <section>
          <h1 className="font-display text-3xl font-bold sm:text-4xl uppercase leading-tight tracking-wide">{workout.name}</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">{workout.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="rounded-full bg-acid px-3.5 py-1.5 text-xs font-semibold text-[#0c0d10]">{group}</span>
            ))}
          </div>

          <dl className="mt-8 overflow-hidden border border-[#232732] bg-[#15171d]">
            {specs.map(([label, value], index) => (
              <div key={label} className={`flex items-center justify-between gap-6 px-6 py-3.5 ${index < specs.length - 1 ? "border-b border-[#232732]" : ""}`}>
                <dt className="text-xs font-bold tracking-wide text-muted">{label}</dt>
                <dd className="text-right text-sm font-medium text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9">
            <h2 className="text-base font-extrabold tracking-wide">INSTRUCTIONS</h2>
            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="grid grid-cols-[1.5rem_1fr] gap-2 text-sm leading-6 text-gray-300">
                  <span className="text-acid">{index + 1}.</span><span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10"><WorkoutActions workout={workout} /></div>
        </section>
      </div>
    </main>
  );
}
