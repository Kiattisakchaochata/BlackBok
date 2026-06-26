import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";

const allowedStatus = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"] as const;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;
  const leadId = Number(id);

  if (!Number.isInteger(leadId) || leadId <= 0) {
    return NextResponse.json(
      { ok: false, error: "Invalid lead id" },
      { status: 400 }
    );
  }

  const body = (await req.json()) as { status?: string };

  if (!body.status || !allowedStatus.includes(body.status as any)) {
    return NextResponse.json(
      { ok: false, error: "Invalid status" },
      { status: 400 }
    );
  }

  const newStatus = body.status as (typeof allowedStatus)[number];

  const oldLead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { status: true },
  });

  if (!oldLead) {
    return NextResponse.json(
      { ok: false, error: "Lead not found" },
      { status: 404 }
    );
  }

  if (oldLead.status === newStatus) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      message: "Status unchanged",
    });
  }

  const lead = await prisma.$transaction(async (tx) => {
    const updatedLead = await tx.lead.update({
      where: { id: leadId },
      data: { status: newStatus },
    });

    await tx.leadActivity.create({
      data: {
        leadId,
        type: "STATUS_CHANGED",
        message: `เปลี่ยนสถานะจาก ${oldLead.status} → ${newStatus}`,
      },
    });

    return updatedLead;
  });

  return NextResponse.json({
    ok: true,
    lead,
  });
}