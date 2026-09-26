export const FALLBACK_WORKOUTS = [
  {id:1,name:"Barbell Bench Press",muscleGroups:["Chest","Arms"],equipment:"Barbell, Bench",difficulty:"Intermediate",sets:4,reps:"6-8",duration:25,caloriesBurned:180,rating:4.8,description:"A compound press for building chest and triceps strength.",instructions:["Lie on the bench with feet planted.","Lower the bar to mid-chest with control.","Press the bar upward without bouncing.","Keep your shoulder blades stable."],image:"/banner.png"},
  {id:2,name:"Pull-Up",muscleGroups:["Back","Arms"],equipment:"Pull-up Bar",difficulty:"Intermediate",sets:4,reps:"6-10",duration:15,caloriesBurned:120,rating:4.7,description:"A bodyweight pulling movement for the back and arms.",instructions:["Grip the bar securely.","Brace your core.","Pull your chest toward the bar.","Lower yourself with control."],image:"/banner.png"},
  {id:3,name:"Back Squat",muscleGroups:["Legs","Core"],equipment:"Barbell, Rack",difficulty:"Intermediate",sets:4,reps:"6-8",duration:30,caloriesBurned:240,rating:4.9,description:"A foundational lower-body strength exercise.",instructions:["Place the bar securely across your upper back.","Brace your core and descend.","Keep your knees tracking over your toes.","Drive through your feet to stand."],image:"/banner.png"},
  {id:4,name:"Overhead Press",muscleGroups:["Shoulders","Arms"],equipment:"Barbell",difficulty:"Intermediate",sets:4,reps:"6-8",duration:20,caloriesBurned:150,rating:4.6,description:"A standing press for shoulders and triceps.",instructions:["Start with the bar at shoulder height.","Brace your core.","Press the bar overhead.","Lower it under control."],image:"/banner.png"},
  {id:5,name:"Dumbbell Bicep Curl",muscleGroups:["Arms"],equipment:"Dumbbells",difficulty:"Beginner",sets:3,reps:"10-12",duration:12,caloriesBurned:80,rating:4.3,description:"An isolation exercise for the biceps.",instructions:["Stand tall with dumbbells at your sides.","Keep elbows close to your body.","Curl toward your shoulders.","Lower slowly."],image:"/banner.png"},
  {id:6,name:"Hollow-Body Plank",muscleGroups:["Core"],equipment:"Bodyweight",difficulty:"Intermediate",sets:3,reps:"30-45 sec",duration:10,caloriesBurned:60,rating:4.4,description:"A core stability exercise for full-body tension.",instructions:["Brace your abdomen.","Lift your shoulders and legs slightly.","Keep your lower back controlled.","Hold while breathing steadily."],image:"/banner.png"},
  {id:7,name:"Burpee",muscleGroups:["Full Body"],equipment:"Bodyweight",difficulty:"Intermediate",sets:3,reps:"10-15",duration:12,caloriesBurned:160,rating:4.2,description:"A full-body conditioning exercise.",instructions:["Squat down from standing.","Place hands down and extend your feet back.","Return your feet forward.","Stand and jump."],image:"/banner.png"},
  {id:8,name:"Conventional Deadlift",muscleGroups:["Back","Legs"],equipment:"Barbell",difficulty:"Advanced",sets:4,reps:"5-6",duration:28,caloriesBurned:260,rating:4.9,description:"A compound lift for posterior-chain strength.",instructions:["Stand with the bar over mid-foot.","Hinge and grip the bar.","Brace and drive through the floor.","Stand tall and lower with control."],image:"/banner.png"},
  {id:9,name:"Push-Up",muscleGroups:["Chest","Arms","Core"],equipment:"Bodyweight",difficulty:"Beginner",sets:3,reps:"10-20",duration:10,caloriesBurned:90,rating:4.5,description:"A classic bodyweight pressing exercise.",instructions:["Start in a straight-arm plank.","Lower your chest with control.","Push the floor away.","Keep your body aligned."],image:"/banner.png"},
  {id:10,name:"Walking Lunge",muscleGroups:["Legs"],equipment:"Dumbbells (optional)",difficulty:"Beginner",sets:3,reps:"10-12 / leg",duration:18,caloriesBurned:170,rating:4.4,description:"A unilateral lower-body exercise for strength and balance.",instructions:["Stand tall.","Step forward into a lunge.","Push through the front foot.","Alternate legs."],image:"/banner.png"},
  {id:11,name:"Russian Twist",muscleGroups:["Core"],equipment:"Medicine Ball",difficulty:"Intermediate",sets:3,reps:"12-16 / side",duration:8,caloriesBurned:70,rating:4.1,description:"A rotational core exercise.",instructions:["Sit with knees bent.","Lean back slightly.","Rotate your torso side to side.","Keep the movement controlled."],image:"/banner.png"},
  {id:12,name:"Kettlebell Swing",muscleGroups:["Full Body","Shoulders"],equipment:"Kettlebell",difficulty:"Intermediate",sets:4,reps:"12-15",duration:16,caloriesBurned:200,rating:4.7,description:"An explosive hip-hinge movement for conditioning.",instructions:["Start with the kettlebell in front.","Hinge and swing between your legs.","Drive your hips forward.","Control the return."],image:"/banner.png"}
];

export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  try {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    return Array.isArray(data) && data.length ? data : FALLBACK_WORKOUTS;
  } catch {
    return FALLBACK_WORKOUTS;
  }
}

export async function getWorkout(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { next: { revalidate: 3600 } });
    if (response.ok) return response.json();
    if (response.status !== 404) throw new Error("API unavailable");
  } catch {}
  return FALLBACK_WORKOUTS.find((workout) => String(workout.id) === String(id)) || null;
}
