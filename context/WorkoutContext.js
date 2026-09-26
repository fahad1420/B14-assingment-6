"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "fitlog-workout-state";
const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored) {
        // Hydrate the external localStorage snapshot after mounting.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPlan(Array.isArray(stored.plan) ? stored.plan : []);
        setSaved(Array.isArray(stored.saved) ? stored.saved : []);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
  }, [hydrated, plan, saved]);

  const addToPlan = (workout) => {
    if (plan.some((item) => item.id === workout.id)) {
      toast("Already in today's plan");
      return false;
    }
    if (plan.length >= 5) {
      toast.error("Today's plan is limited to five lifts");
      return false;
    }
    setPlan((items) => [...items, { ...workout, done: false }]);
    toast.success("Added to today's plan");
    return true;
  };

  const saveForLater = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast("Already saved for later");
      return false;
    }
    setSaved((items) => [...items, workout]);
    toast.success("Saved for later");
    return true;
  };

  const removeWorkout = (id, list) => {
    if (list === "plan") setPlan((items) => items.filter((item) => item.id !== id));
    else setSaved((items) => items.filter((item) => item.id !== id));
    toast.success("Workout removed");
  };

  const markAsDone = (id) => {
    setPlan((items) => items.map((item) => item.id === id ? { ...item, done: !item.done } : item));
    const target = plan.find((item) => item.id === id);
    toast.success(target?.done ? "Workout marked active" : "Workout marked as done");
  };

  const value = {
    plan, saved, hydrated, addToPlan, saveForLater, removeWorkout, markAsDone,
    planCount: plan.length, savedCount: saved.length,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkouts must be used within WorkoutProvider");
  return context;
}
