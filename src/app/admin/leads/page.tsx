import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

type Props = {
    searchParams: Promise<{
        q?: string;
        status?: string;
        follow?: string;
        priority?: string;
        page?: string;
    }>;
};

const PAGE_SIZE = 20;

const statuses = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];
const priorities = ["LOW", "MEDIUM", "HIGH"];

export default async function AdminLeadsPage({ searchParams }: Props) {
    const cookieStore = await cookies();
    const token = cookieStore.get(getAdminCookieName())?.value;

    if (!verifyAdminToken(token)) {
        redirect("/admin/login");
    }

    const params = await searchParams;
    const q = params.q?.trim() || "";
    const status = params.status || "";
    const follow = params.follow || "";
    const priority = params.priority || "";
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const page = Math.max(Number(params.page || "1"), 1);
    const skip = (page - 1) * PAGE_SIZE;

    const where: any = {
        ...(status && statuses.includes(status)
            ? { status }
            : {}),
        ...(priority && priorities.includes(priority)
            ? { priority }
            : {}),
        ...(follow === "today"
            ? { followUpAt: { gte: todayStart, lte: todayEnd } }
            : {}),
        ...(follow === "overdue"
            ? { followUpAt: { lt: todayStart } }
            : {}),
        ...(follow === "has"
            ? { followUpAt: { not: null } }
            : {}),
        ...(follow === "none"
            ? { followUpAt: null }
            : {}),

        ...(q
            ? {
                OR: [
                    { name: { contains: q, mode: "insensitive" } },
                    { phone: { contains: q, mode: "insensitive" } },
                    { email: { contains: q, mode: "insensitive" } },
                    { service: { contains: q, mode: "insensitive" } },
                ],
            }
            : {}),
    };

    const [leads, total, totalAll, newCount, followTodayCount, overdueCount, highCount, wonCount] =
        await Promise.all([
            prisma.lead.findMany({
                where,
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: PAGE_SIZE,
            }),
            prisma.lead.count({ where }),
            prisma.lead.count(),
            prisma.lead.count({ where: { status: "NEW" } }),
            prisma.lead.count({
                where: {
                    status: {
                        notIn: ["WON", "LOST"],
                    },
                    followUpAt: {
                        gte: todayStart,
                        lte: todayEnd,
                    },
                },
            }),
            prisma.lead.count({
                where: {
                    status: {
                        notIn: ["WON", "LOST"],
                    },
                    followUpAt: {
                        lt: todayStart,
                    },
                },
            }),
            prisma.lead.count({ where: { priority: "HIGH" } }),
            prisma.lead.count({ where: { status: "WON" } }),
        ]);

    const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

    function buildUrl(nextPage: number) {
        const sp = new URLSearchParams();
        if (q) sp.set("q", q);
        if (status) sp.set("status", status);
        if (follow) sp.set("follow", follow);
        if (priority) sp.set("priority", priority);
        sp.set("page", String(nextPage));
        return `/admin/leads?${sp.toString()}`;
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Leads</h1>
                    <p className="mt-2 text-black/55">
                        รายชื่อลูกค้าที่ส่งฟอร์มเข้ามา
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <a
                        href="/api/admin/leads/export"
                        className="btn-primary"
                    >
                        Export Excel
                    </a>

                    <Link href="/admin/dashboard" className="btn-outline">
                        กลับ Dashboard
                    </Link>
                </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                <SummaryCard title="Leads ทั้งหมด" value={totalAll} />
                <SummaryCard title="NEW" value={newCount} />
                <SummaryCard title="Follow-up วันนี้" value={followTodayCount} />
                <SummaryCard title="เลยกำหนด" value={overdueCount} />
                <SummaryCard title="HIGH Priority" value={highCount} />
                <SummaryCard title="WON" value={wonCount} />
            </div>
            <form className="mt-6 rounded-[24px] border border-black/6 bg-white p-4 shadow-sm">
                <div className="grid gap-3 lg:grid-cols-[1fr_140px]">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="ค้นหาชื่อ / เบอร์ / อีเมล / บริการ"
                        className="h-12 rounded-2xl border border-black/10 px-4 text-sm outline-none transition focus:border-[var(--bb-blue)]"
                    />

                    <button className="h-12 rounded-2xl bg-[var(--bb-blue)] px-5 text-sm font-bold text-white transition hover:opacity-90">
                        ค้นหา
                    </button>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_120px]">
                    <div className="relative">
                        <select
                            name="status"
                            defaultValue={status}
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-blue-300 hover:bg-white"
                        >
                            <option value="">ทุกสถานะ</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                    <div className="relative">
                        <select
                            name="follow"
                            defaultValue={follow}
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-blue-300 hover:bg-white"
                        >
                            <option value="">ทุก Follow-up</option>
                            <option value="today">วันนี้</option>
                            <option value="overdue">เลยกำหนด</option>
                            <option value="has">มี Follow-up</option>
                            <option value="none">ไม่มี Follow-up</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <ChevronDownIcon />
                        </span>
                    </div>

                    <div className="relative">
                        <select
                            name="priority"
                            defaultValue={priority}
                            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-blue-300 hover:bg-white"
                        >
                            <option value="">ทุก Priority</option>
                            {priorities.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <ChevronDownIcon />
                        </span>
                    </div>

                    <Link
                        href="/admin/leads"
                        className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-white"
                    >
                        ล้าง
                    </Link>
                </div>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
                <QuickFilter href="/admin/leads" active={!status && !follow && !priority}>
                    ทั้งหมด
                </QuickFilter>

                <QuickFilter href="/admin/leads?status=NEW" active={status === "NEW"}>
                    NEW
                </QuickFilter>

                <QuickFilter href="/admin/leads?priority=HIGH" active={priority === "HIGH"}>
                    HIGH
                </QuickFilter>

                <QuickFilter href="/admin/leads?follow=today" active={follow === "today"}>
                    Follow-up วันนี้
                </QuickFilter>

                <QuickFilter href="/admin/leads?follow=overdue" active={follow === "overdue"}>
                    เลยกำหนด
                </QuickFilter>

                <QuickFilter href="/admin/leads?status=WON" active={status === "WON"}>
                    WON
                </QuickFilter>
            </div>

            {(q || status || follow || priority) && (
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm text-blue-700">
                    <span className="font-bold">กำลังกรอง:</span>

                    {q && <FilterPill label={`ค้นหา: ${q}`} />}
                    {status && <FilterPill label={`สถานะ: ${status}`} />}
                    {follow && <FilterPill label={`Follow-up: ${follow}`} />}
                    {priority && <FilterPill label={`Priority: ${priority}`} />}

                    <Link
                        href="/admin/leads"
                        className="ml-auto font-bold text-blue-700 hover:underline"
                    >
                        ล้างทั้งหมด
                    </Link>
                </div>
            )}

            <div className="mt-5 text-sm text-black/50">
                พบทั้งหมด {total} รายการ
            </div>

            <div className="mt-4 overflow-hidden rounded-[24px] border border-black/6 bg-white shadow-sm">
                <div className="grid grid-cols-[1.5fr_210px_100px_120px_72px] bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <div>ลูกค้า</div>
                    <div>บริการ / งบ</div>
                    <div>Priority</div>
                    <div>สถานะ</div>
                    <div className="text-right">จัดการ</div>
                </div>

                {leads.map((lead) => (
                    <div
                        key={lead.id}
                        className={`grid grid-cols-[1.5fr_210px_100px_120px_72px] items-center border-t border-black/5 px-4 py-3 text-sm transition hover:bg-slate-50 ${rowTone(
                            lead.status
                        )}`}
                    >
                        <div className="min-w-0">
                            <Link
                                href={`/admin/leads/${lead.id}`}
                                className="block truncate font-extrabold text-black hover:text-[var(--bb-blue)]"
                            >
                                {lead.name}
                            </Link>

                            <div className="mt-1 font-semibold text-black/55">{lead.phone}</div>

                            <div className="mt-0.5 max-w-[280px] truncate text-black/40">
                                {lead.email || "-"}
                            </div>

                            <div className="mt-1 text-xs text-black/35">
                                {new Date(lead.createdAt).toLocaleString("th-TH")}
                            </div>
                        </div>

                        <div className="min-w-0">
                            <div className="truncate font-bold text-black/75">
                                {lead.service || "-"}
                            </div>
                            <div className="mt-1 truncate text-black/45">
                                งบ: {lead.budget || "-"}
                            </div>
                            <div className="mt-1 truncate text-black/45">
                                <FollowUpBadge followUpAt={lead.followUpAt} status={lead.status} />
                            </div>
                        </div>

                        <div>
                            <PriorityBadge priority={lead.priority} />
                        </div>

                        <div>
                            <LeadStatusSelect leadId={lead.id} value={lead.status} />
                        </div>

                        <div className="text-right">
                            <Link
                                href={`/admin/leads/${lead.id}`}
                                className="inline-flex h-9 min-w-[56px] items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 transition-all hover:border-blue-300 hover:bg-white hover:text-[var(--bb-blue)]"
                            >
                                เปิด
                            </Link>
                        </div>
                    </div>
                ))}

                {leads.length === 0 && (
                    <div className="p-10 text-center text-sm text-black/45">
                        ไม่พบ Lead
                    </div>
                )}
            </div>

            <div className="mt-5 flex items-center justify-between">
                <Link
                    href={buildUrl(page - 1)}
                    className={`btn-outline ${page <= 1 ? "pointer-events-none opacity-40" : ""}`}
                >
                    ก่อนหน้า
                </Link>

                <div className="text-sm font-semibold text-black/50">
                    หน้า {page} / {totalPages}
                </div>

                <Link
                    href={buildUrl(page + 1)}
                    className={`btn-outline ${page >= totalPages ? "pointer-events-none opacity-40" : ""
                        }`}
                >
                    ถัดไป
                </Link>
            </div>
        </div>
    );
}

function SummaryCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-black/6 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-[var(--bb-blue)]" />

            <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wide text-black/40">
                    {title}
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--bb-blue)]/70" />
            </div>

            <div className="mt-3 text-3xl font-extrabold tracking-tight text-black">
                {value}
            </div>
        </div>
    );
}
function FilterPill({ label }: { label: string }) {
    return (
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
            {label}
        </span>
    );
}

function QuickFilter({
    href,
    active,
    children,
}: {
    href: string;
    active: boolean;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`inline-flex h-9 items-center rounded-full border px-4 text-sm font-bold transition ${active
                ? "border-[var(--bb-blue)] bg-blue-50 text-[var(--bb-blue)]"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-[var(--bb-blue)]"
                }`}
        >
            {children}
        </Link>
    );
}

function ChevronDownIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M7 9.5L12 14.5L17 9.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function rowTone(status: string) {
    const map: Record<string, string> = {
        NEW: "bg-blue-50/20",
        CONTACTED: "bg-amber-50/20",
        QUOTED: "bg-violet-50/20",
        WON: "bg-emerald-50/20",
        LOST: "bg-slate-50/50",
    };

    return map[status] || "";
}

function FollowUpBadge({
    followUpAt,
    status,
}: {
    followUpAt: Date | null;
    status: string;
}) {
    if (status === "WON") {
        return (
            <span className="inline-flex rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                ปิดการขาย
            </span>
        );
    }

    if (status === "LOST") {
        return (
            <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
                ปิดงาน
            </span>
        );
    }

    if (!followUpAt) {
        return (
            <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
                ไม่มี Follow-up
            </span>
        );
    }

    const date = new Date(followUpAt);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    if (date < todayStart) {
        return (
            <span className="inline-flex rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
                เลยกำหนด
            </span>
        );
    }

    if (date >= todayStart && date <= todayEnd) {
        return (
            <span className="inline-flex rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                วันนี้
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
            {date.toLocaleDateString("th-TH")}
        </span>
    );
}

function PriorityBadge({ priority }: { priority: string }) {
    const map: Record<string, string> = {
        LOW: "border-slate-200 bg-slate-50 text-slate-600",
        MEDIUM: "border-amber-200 bg-amber-50 text-amber-700",
        HIGH: "border-rose-200 bg-rose-50 text-rose-700",
    };

    return (
        <span
            className={`inline-flex h-8 items-center justify-center rounded-lg border px-3 text-xs font-bold ${map[priority] || "border-slate-200 bg-slate-50 text-slate-600"
                }`}
        >
            {priority}
        </span>
    );
}