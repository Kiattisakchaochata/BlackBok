import { prisma } from "@/lib/prisma";

export async function addLeadActivity({
  leadId,
  type,
  message,
}: {
  leadId: number;
  type: string;
  message: string;
}) {
  return prisma.leadActivity.create({
    data: {
      leadId,
      type,
      message,
    },
  });
}