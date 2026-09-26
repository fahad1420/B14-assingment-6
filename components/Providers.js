"use client";

import { Toaster } from "react-hot-toast";
import { WorkoutProvider } from "@/context/WorkoutContext";

export default function Providers({ children }) {
  return (
    <WorkoutProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2600,
          style: {
            background: "#15171d",
            color: "#f8fafc",
            border: "1px solid #2b303d",
            borderRadius: "4px",
          },
          success: { iconTheme: { primary: "#ccff00", secondary: "#0c0d10" } },
        }}
      />
    </WorkoutProvider>
  );
}
