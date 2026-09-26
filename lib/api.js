const fallbackWorkouts = [
  {id:1,name:"Barbell Bench Press",muscleGroups:["Chest","Arms"],equipment:"Barbell, Bench",difficulty:"Intermediate",sets:4,reps:"6-8",duration:25,caloriesBurned:180,rating:4.8,description:"A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",instructions:["Lie on the bench with eyes under the bar and feet planted.","Unrack with locked elbows and lower the bar to mid-chest.","Press up in a slight arc until elbows lock without bouncing.","Keep shoulder blades pinched and a natural arch in the back."],image:"/banner.png"},
  {id:2,name:"Pull-Up",muscleGroups:["Back","Arms"],equipment:"Pull-up Bar",difficulty:"Intermediate",sets:4,reps:"6-10",duration:15,caloriesBurned:120,rating:4.7,description:"A bodyweight pulling movement that develops the back and arms.",instructions:["Grip the bar slightly wider than shoulder width.","Brace your core and pull your chest toward the bar.","Keep your body controlled without swinging.","Lower slowly to full arm extension."],image:"/banner.png"},
  {id:3,name:"Back Squat",muscleGroups:["Legs","Core"],equipment:"Barbell, Rack",difficulty:"Intermediate",sets:4,reps:"6-8",duration:30,caloriesBurned:240,rating:4.9,description:"A foundational lower-body movement for building strength and stability.",instructions:["Set the bar securely across your upper back.","Brace your core and descend with control.","Keep your knees tracking over your toes.","Drive through your feet to stand tall."],image:"/banner.png"},
  {id:4,name:"Overhead Press",muscleGroups:["Shoulders","Arms"],equipment:"Barbell",difficulty:"Intermediate",sets:4,reps:"6-8",duration:20,caloriesBurned:150,rating:4.6,description:"A standing press that develops shoulder and triceps strength.",instructions:["Start with the bar at shoulder height.","Brace your core and press the bar overhead.","Keep the bar moving close to your body.","Lower it under control."],image:"/banner.png"},
  {id:5,name:"Dumbbell Bicep Curl",muscleGroups:["Arms"],equipment:"Dumbbells",difficulty:"Beginner",sets:3,reps:"10-12",duration:12,caloriesBurned:80,rating:4.3,description:"A simple isolation exercise for building biceps strength.",instructions:["Stand tall with dumbbells at your sides.","Keep your elbows close to your body.","Curl the weights toward your shoulders.","Lower slowly without swinging."],image:"/banner.png"},
  {id:6,name:"Hollow-Body Plank",muscleGroups:["Core"],equipment:"Bodyweight",difficulty:"Intermediate",sets:3,reps:"30-45 sec",duration:10,caloriesBurned:60,rating:4.4,description:"A core stability movement that trains full-body tension.",instructions:["Lie on your back and brace your abdomen.","Lift your shoulders and legs slightly from the floor.","Keep your lower back controlled.","Hold the position while breathing steadily."],image:"/banner.png"},
  {id:7,name:"Burpee",muscleGroups:["Full Body"],equipment:"Bodyweight",difficulty:"Intermediate",sets:3,reps:"10-15",duration:12,caloriesBurned:160,rating:4.2,description:"A full-body conditioning movement combining strength and cardio.",instructions:["Start standing and squat down.","Place your hands down and extend your feet back.","Return your feet under your body.","Stand and jump with control."],image:"/banner.png"},
  {id:8,name:"Conventional Deadlift",muscleGroups:["Back","Legs"],equipment:"Barbell",difficulty:"Advanced",sets:4,reps:"5-6",duration:28,caloriesBurned:260,rating:4.9,description:"A compound lift that develops posterior-chain strength.",instructions:["Stand with the bar over your mid-foot.","Hinge at the hips and grip the bar.","Brace your core and drive through the floor.","Stand tall and lower the bar with control."],image:"/banner.png"},
  {id:9,name:"Push-Up",muscleGroups:["Chest","Arms","Core"],equipment:"Bodyweight",difficulty:"Beginner",sets:3,reps:"10-20",duration:10,caloriesBurned:90,rating:4.5,description:"A classic bodyweight press for the chest, arms, and core.",instructions:["Start in a straight-arm plank position.","Lower your chest while keeping your body aligned.","Push the floor away to return to the start.","Keep your core braced throughout."],image:"/banner.png"},
  {id:10,name:"Walking Lunge",muscleGroups:["Legs"],equipment:"Dumbbells (optional)",difficulty:"Beginner",sets:3,reps:"10-12 / leg",duration:18,caloriesBurned:170,rating:4.4,description:"A unilateral leg exercise that builds balance and lower-body strength.",instructions:["Stand tall with feet hip-width apart.","Step forward and lower into a lunge.","Push through the front foot to step forward.","Alternate legs while maintaining balance."],image:"/banner.png"},
  {id:11,name:"Russian Twist",muscleGroups:["Core"],equipment:"Medicine Ball",difficulty:"Intermediate",sets:3,reps:"12-16 / side",duration:8,caloriesBurned:70,rating:4.1,description:"A rotational core exercise for trunk control and stability.",instructions:["Sit with knees bent and torso slightly reclined.","Hold the medicine ball in front of your chest.","Rotate your torso from side to side.","Keep the movement controlled."],image:"/banner.png"},
  {id:12,name:"Kettlebell Swing",muscleGroups:["Full Body","Shoulders"],equipment:"Kettlebell",difficulty:"Intermediate",sets:4,reps:"12-15",duration:16,caloriesBurned:200,rating:4.7,description:"An explosive hip-hinge movement for full-body conditioning.",instructions:["Stand with the kettlebell in front of you.","Hinge at the hips and swing it between your legs.","Drive your hips forward to swing it to chest height.","Let the bell return and repeat with control."],image:"/banner.png"}
];

export async function getWorkouts() {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    return Array.isArray(data) && data.length ? data : fallbackWorkouts;
  } catch {
    return fallbackWorkouts;
  }
}

export async function getWorkout(id) {
  try {
    const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, { next: { revalidate: 3600 } });
    if (response.ok) return response.json();
    if (response.status === 404) return fallbackWorkouts.find((workout) => String(workout.id) === String(id)) || null;
  } catch {}
  return fallbackWorkouts.find((workout) => String(workout.id) === String(id)) || null;
}
