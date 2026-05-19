import { NextResponse } from "next/server";
import { createOtp } from "@/lib/mock-backend";

export async function POST(request: Request) {
  const body = await request.json();
  const result = createOtp(body.email || "");

  if (!result.ok) {
    return NextResponse.json(result, { status: 404 });
  }

  return NextResponse.json(result);
}
