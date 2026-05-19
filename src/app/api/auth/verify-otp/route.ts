import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/mock-backend";

export async function POST(request: Request) {
  const body = await request.json();
  const result = verifyOtp(body.email || "", body.otp || "");

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
