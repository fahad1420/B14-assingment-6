export const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const response = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!response.ok) throw new Error("Unable to load workouts");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, { next: { revalidate: 3600 } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to load workout");
  return response.json();
}
