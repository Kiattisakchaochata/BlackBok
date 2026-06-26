import { NextResponse } from "next/server";
import { createAdminToken, getAdminCookieName } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = await req.json();

  const username = body.username;
  const password = body.password;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { ok: false, error: "Username หรือ Password ไม่ถูกต้อง" },
      { status: 401 }
    );
  }

  const token = createAdminToken();

  const res = NextResponse.json({ ok: true });

  res.cookies.set(getAdminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}