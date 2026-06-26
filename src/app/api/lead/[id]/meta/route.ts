import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";

const allowedPriority = ["LOW", "MEDIUM", "HIGH"] as const;

function formatDate(value: Date | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("th-TH");
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const leadId = Number(id);

  if (!Number.isInteger(leadId) || leadId <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid lead id" }, { status: 400 });
  }

  const body = (await req.json()) as {
    priority?: string;
    followUpAt?: string | null;
  };

  if (body.priority && !allowedPriority.includes(body.priority as any)) {
    return NextResponse.json({ ok: false, error: "Invalid priority" }, { status: 400 });
  }

  const oldLead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: {
      priority: true,
      followUpAt: true,
    },
  });

  if (!oldLead) {
    return NextResponse.json({ ok: false, error: "Lead not found" }, { status: 404 });
  }

  const newPriority = body.priority || oldLead.priority;
  const newFollowUpAt = body.followUpAt ? new Date(body.followUpAt) : null;

  const priorityChanged = oldLead.priority !== newPriority;
  const oldFollowTime = oldLead.followUpAt ? oldLead.followUpAt.getTime() : null;
  const newFollowTime = newFollowUpAt ? newFollowUpAt.getTime() : null;
  const followChanged = oldFollowTime !== newFollowTime;

  if (!priorityChanged && !followChanged) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      message: "Meta unchanged",
    });
  }

  const lead = await prisma.$transaction(async (tx) => {
    const updatedLead = await tx.lead.update({
      where: { id: leadId },
      data: {
        priority: newPriority as any,
        followUpAt: newFollowUpAt,
      },
    });

    if (priorityChanged) {
      await tx.leadActivity.create({
        data: {
          leadId,
          type: "PRIORITY_CHANGED",
          message: `เปลี่ยน Priority จาก ${oldLead.priority} → ${newPriority}`,
        },
      });
    }

    if (followChanged) {
      await tx.leadActivity.create({
        data: {
          leadId,
          type: "FOLLOW_UP_CHANGED",
          message: `เปลี่ยน Follow-up จาก ${formatDate(oldLead.followUpAt)} → ${formatDate(
            newFollowUpAt
          )}`,
        },
      });
    }

    return updatedLead;
  });

  return NextResponse.json({ ok: true, lead });
}