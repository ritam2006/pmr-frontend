import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}