"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: string;
  exp: number;
  iat: number;
};

export async function getTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function getUsername() {
  const token = await getTokenFromCookie();
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
