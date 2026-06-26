import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

type Payload = {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  budget?: string;
  message?: string;
  turnstileToken?: string;
  website?: string;
};

const leadSchema = z.object({
  name: z.string().trim().min(1, "กรุณากรอกชื่อ").max(100),
  phone: z.string().trim().min(6, "กรุณากรอกเบอร์โทร").max(30),
  email: z.string().trim().email("รูปแบบอีเมลไม่ถูกต้อง").optional().or(z.literal("")),
  service: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000).optional(),
  turnstileToken: z.string().optional(),
  website: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function verifyTurnstile(token?: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const formData = new FormData();
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

function leadText(body: Payload) {
  return `
📩 NEW LEAD - THE BLACK BOK

ชื่อ: ${body.name}
โทร: ${body.phone}
อีเมล: ${body.email || "-"}
บริการ: ${body.service || "-"}
งบประมาณ: ${body.budget || "-"}
รายละเอียด:
${body.message || "-"}
`.trim();
}

async function sendLineMessage(text: string) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = process.env.LINE_ADMIN_USER_ID;

  if (!token || !userId) return;

  await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text }],
    }),
  });
}

async function sendEmail(body: Payload) {
  if (!process.env.RESEND_API_KEY) return;

  const to = process.env.LEAD_EMAIL_TO || "ck.complete@gmail.com";
  const from =
    process.env.LEAD_EMAIL_FROM || "The Black Bok <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    subject: `New Lead: ${body.name} - ${body.service || "Contact"}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.7;">
        <h2>📩 New Lead - The Black Bok</h2>
        <p><strong>ชื่อ:</strong> ${body.name}</p>
        <p><strong>โทร:</strong> ${body.phone}</p>
        <p><strong>อีเมล:</strong> ${body.email || "-"}</p>
        <p><strong>บริการ:</strong> ${body.service || "-"}</p>
        <p><strong>งบประมาณ:</strong> ${body.budget || "-"}</p>
        <p><strong>รายละเอียด:</strong></p>
        <p>${body.message || "-"}</p>
      </div>
    `,
  });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = leadSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "ข้อมูลไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const body = parsed.data as Payload;
    const ip = getClientIp(req);
    const limited = rateLimit({
      key: `lead:${ip}`,
      limit: 5,
      windowMs: 60_000,
    });

    if (!limited.ok) {
      return NextResponse.json(
        { ok: false, error: "ส่งข้อมูลถี่เกินไป กรุณาลองใหม่อีกครั้ง" },
        { status: 429 }
      );
    }
    if (!body?.name || !body?.phone) {
      return NextResponse.json(
        { ok: false, error: "กรุณากรอกชื่อและเบอร์โทร" },
        { status: 400 }
      );
    }
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const turnstileOk = await verifyTurnstile(body.turnstileToken);

    if (!turnstileOk) {
      return NextResponse.json(
        { ok: false, error: "ยืนยันความปลอดภัยไม่สำเร็จ" },
        { status: 403 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        service: body.service || null,
        budget: body.budget || null,
        message: body.message || null,

        source: req.headers.get("referer") || null,
        userAgent: req.headers.get("user-agent") || null,
        ipAddress: ip,

        activities: {
          create: {
            type: "LEAD_CREATED",
            message: "Lead ถูกสร้างจากหน้า Contact Form",
          },
        },
      },
    });

    const text = leadText(body);

    await Promise.allSettled([sendEmail(body), sendLineMessage(text)]);

    console.log("✅ NEW LEAD:", lead);

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (error) {
    console.error("❌ LEAD ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}