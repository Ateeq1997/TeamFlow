import { NextResponse } from "next/server";
import { loginUser } from "@/lib/mock-backend";

export async function POST(request: Request) {
  const body = await request.json();
  const result = loginUser(body.email || "", body.password || "");

  if (!result.ok) {
    return NextResponse.json(result, { status: 401 });
  }

  return NextResponse.json(result);
}
