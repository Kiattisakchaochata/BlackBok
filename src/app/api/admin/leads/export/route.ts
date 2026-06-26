import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminCookieName())?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = leads.map((lead) => ({
    ID: lead.id,
    Name: lead.name,
    Phone: lead.phone,
    Email: lead.email || "",
    Service: lead.service || "",
    Budget: lead.budget || "",
    Message: lead.message || "",
    Status: lead.status,
    Source: lead.source || "",
    Campaign: lead.campaign || "",
    IP: lead.ipAddress || "",
    UserAgent: lead.userAgent || "",
    Note: lead.note || "",
    CreatedAt: lead.createdAt.toLocaleString("th-TH"),
    UpdatedAt: lead.updatedAt.toLocaleString("th-TH"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="blackbok-leads.xlsx"`,
    },
  });
}