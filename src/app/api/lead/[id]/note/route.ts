import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";

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

  const body = (await req.json()) as { note?: string };
  const newNote = body.note?.trim() || null;

  const oldLead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { note: true },
  });

  if (!oldLead) {
    return NextResponse.json(
      { ok: false, error: "Lead not found" },
      { status: 404 }
    );
  }

  if ((oldLead.note || null) === newNote) {
    return NextResponse.json({
      ok: true,
      skipped: true,
      message: "Note unchanged",
    });
  }

  const lead = await prisma.$transaction(async (tx) => {
    const updatedLead = await tx.lead.update({
      where: { id: leadId },
      data: {
        note: newNote,
      },
    });

    await tx.leadActivity.create({
      data: {
        leadId,
        type: "NOTE_ADDED",
        message: newNote || "ลบ Note",
      },
    });

    return updatedLead;
  });

  return NextResponse.json({ ok: true, lead });
}