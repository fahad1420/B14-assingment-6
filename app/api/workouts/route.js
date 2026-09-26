import { NextResponse } from "next/server";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to load workouts" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json(
      { error: "Unable to load workouts" },
      { status: 500 }
    );
  }
}
