import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";
import LeadNoteForm from "@/components/admin/LeadNoteForm";
import LeadMetaForm from "@/components/admin/LeadMetaForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function LeadDetailPage({ params }: Props) {
    const cookieStore = await cookies();
    const token = cookieStore.get(getAdminCookieName())?.value;

    if (!verifyAdminToken(token)) {
        redirect("/admin/login");
    }

    const { id } = await params;

    const lead = await prisma.lead.findUnique({
        where: { id: Number(id) },
        include: {
            activities: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!lead) return notFound();
    const noteActivities = lead.activities.filter(
        (activity) => activity.type === "NOTE_ADDED"
    );
    const timelineActivities = lead.activities.filter(
        (activity) => activity.type !== "NOTE_ADDED"
    );
    return (
        <div className="mx-auto w-full max-w-[1180px]">
            <Link
                href="/admin/leads"
                className="text-sm font-bold text-[var(--bb-blue)] hover:underline"
            >
                ← กลับไปหน้า Leads
            </Link>

            <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
                <div className="rounded-[24px] border border-black/6 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div className="text-sm text-black/45">
                                Lead #{lead.id} · {new Date(lead.createdAt).toLocaleString("th-TH")}
                            </div>

                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
                                {lead.name}
                            </h1>

                            <div className="mt-3">
                                <LeadStatusSelect leadId={lead.id} value={lead.status} />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <a href={`tel:${lead.phone}`} className="btn-primary">
                                โทรหา
                            </a>

                            {lead.email && (
                                <a href={`mailto:${lead.email}`} className="btn-outline">
                                    ส่งอีเมล
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                        <Info label="เบอร์โทร" value={lead.phone} />
                        <Info label="อีเมล" value={lead.email || "-"} />
                        <Info label="บริการ" value={lead.service || "-"} />
                        <Info label="งบประมาณ" value={lead.budget || "-"} />
                        <Info label="Source" value={lead.source || "-"} />
                        <Info label="Campaign" value={lead.campaign || "-"} />
                    </div>

                    <div className="mt-3 grid gap-3">
                        <Info label="รายละเอียดโปรเจกต์" value={lead.message || "-"} large />
                        <Info label="User Agent" value={lead.userAgent || "-"} large />
                    </div>

                    <div className="mt-4">
                        <LeadMetaForm
                            leadId={lead.id}
                            defaultPriority={lead.priority}
                            defaultFollowUpAt={lead.followUpAt}
                        />
                    </div>
                </div>

                <div className="grid min-w-0 gap-4">
                    <LeadNoteForm leadId={lead.id} defaultValue={lead.note} />

                    <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-extrabold text-black">Note History</h2>

                        <div className="mt-4 grid max-h-[300px] gap-3 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {noteActivities.map((note) => (
                                <div
                                    key={note.id}
                                    className="rounded-2xl border border-black/6 bg-black/[0.015] p-4"
                                >
                                    <div className="text-xs font-semibold text-black/40">
                                        {new Date(note.createdAt).toLocaleString("th-TH")}
                                    </div>

                                    <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/70">
                                        {note.message}
                                    </div>
                                </div>
                            ))}

                            {noteActivities.length === 0 && (
                                <div className="rounded-2xl border border-black/6 p-5 text-center text-sm text-black/45">
                                    ยังไม่มี Note History
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-extrabold text-black">Timeline</h2>
                        <p className="mt-1 text-sm text-black/45">
                            ประวัติการติดต่อลูกค้าและการเปลี่ยนสถานะ
                        </p>

                        <div className="mt-5 grid max-h-[520px] gap-4 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {timelineActivities.map((activity) => (
                                <div key={activity.id} className="relative pl-6">
                                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[var(--bb-blue)]" />
                                    <div className="absolute left-[5px] top-5 h-full w-px bg-black/10" />

                                    <div className="rounded-2xl border border-black/6 bg-black/[0.015] p-4">
                                        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                            <ActivityTypeBadge type={activity.type} />

                                            <div className="text-xs font-semibold text-black/40">
                                                {new Date(activity.createdAt).toLocaleString("th-TH")}
                                            </div>
                                        </div>
                                        <ActivityMessage message={activity.message} />
                                    </div>
                                </div>
                            ))}

                            {timelineActivities.length === 0 && (
                                <div className="rounded-2xl border border-black/6 p-5 text-center text-sm text-black/45">
                                    ยังไม่มี Timeline
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityTypeBadge({ type }: { type: string }) {
    const map: Record<string, string> = {
        CREATED: "border-emerald-200 bg-emerald-50 text-emerald-700",
        LEAD_CREATED: "border-emerald-200 bg-emerald-50 text-emerald-700",

        STATUS_CHANGED: "border-blue-200 bg-blue-50 text-blue-700",
        PRIORITY_CHANGED: "border-rose-200 bg-rose-50 text-rose-700",
        FOLLOW_UP_CHANGED: "border-amber-200 bg-amber-50 text-amber-700",
        NOTE_ADDED: "border-slate-200 bg-slate-50 text-slate-700",
        META_UPDATED: "border-purple-200 bg-purple-50 text-purple-700",
    };

    const label: Record<string, string> = {
        CREATED: "Lead Created",
        LEAD_CREATED: "Lead Created",

        STATUS_CHANGED: "เปลี่ยนสถานะ",
        PRIORITY_CHANGED: "เปลี่ยน Priority",
        FOLLOW_UP_CHANGED: "เปลี่ยน Follow-up",
        NOTE_ADDED: "Note",
        META_UPDATED: "อัปเดตข้อมูล",
    };

    return (
        <span
            className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-extrabold ${map[type] || "border-slate-200 bg-slate-50 text-slate-600"
                }`}
        >
            {label[type] || type}
        </span>
    );
}

function Info({
    label,
    value,
    large,
}: {
    label: string;
    value: string;
    large?: boolean;
}) {
    return (
        <div
            className={`min-w-0 rounded-2xl border border-black/6 bg-black/[0.015] p-3.5 ${large ? "md:col-span-2" : ""
                }`}
        >
            <div className="text-xs font-bold text-black/40">{label}</div>
            <div className="mt-1.5 break-words text-sm font-bold leading-6 text-black/80">
                {value}
            </div>
        </div>
    );
}
function ActivityMessage({ message }: { message: string }) {
    const parts = message.split(" → ");

    if (parts.length === 2) {
        return (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-600">
                    {parts[0]}
                </span>

                <span className="text-black/30">→</span>

                <span className="rounded-lg bg-blue-50 px-2.5 py-1 font-bold text-[var(--bb-blue)]">
                    {parts[1]}
                </span>
            </div>
        );
    }

    return (
        <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/65">
            {message}
        </div>
    );
}