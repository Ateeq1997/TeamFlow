import { NextResponse } from "next/server";
import { signupUser } from "@/lib/mock-backend";

export async function POST(request: Request) {
  const body = await request.json();
  const result = signupUser(body.name || "", body.email || "", body.password || "");

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
