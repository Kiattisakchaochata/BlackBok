import { NextResponse } from "next/server";

type Payload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  budget?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body?.name || !body?.phone) {
      return NextResponse.json({ ok: false, error: "กรุณากรอกชื่อและเบอร์โทร" }, { status: 400 });
    }

    console.log("✅ NEW LEAD:", { ...body, createdAt: new Date().toISOString() });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}