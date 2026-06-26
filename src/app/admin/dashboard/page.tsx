import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminCookieName, verifyAdminToken } from "@/lib/admin-auth";

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get(getAdminCookieName())?.value;

    if (!verifyAdminToken(token)) {
        redirect("/admin/login");
    }

    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
        total,
        today,
        month,
        newLeads,
        contacted,
        quoted,
        won,
        lost,
        activeLeads,
        highPriority,
        followTodayCount,
        overdueCount,
        recentLeads,
        todayTasks,
        overdueTasks,
        chartLeads,
    ] = await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { createdAt: { gte: startToday } } }),
        prisma.lead.count({ where: { createdAt: { gte: startMonth } } }),
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.lead.count({ where: { status: "CONTACTED" } }),
        prisma.lead.count({ where: { status: "QUOTED" } }),
        prisma.lead.count({ where: { status: "WON" } }),
        prisma.lead.count({ where: { status: "LOST" } }),
        prisma.lead.count({ where: { status: { notIn: ["WON", "LOST"] } } }),
        prisma.lead.count({ where: { priority: "HIGH", status: { notIn: ["WON", "LOST"] } } }),
        prisma.lead.count({
            where: {
                status: { notIn: ["WON", "LOST"] },
                followUpAt: { gte: startToday, lte: endToday },
            },
        }),
        prisma.lead.count({
            where: {
                status: { notIn: ["WON", "LOST"] },
                followUpAt: { lt: startToday },
            },
        }),

        prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            take: 6,
        }),

        prisma.lead.findMany({
            where: {
                status: { notIn: ["WON", "LOST"] },
                followUpAt: { gte: startToday, lte: endToday },
            },
            orderBy: { followUpAt: "asc" },
            take: 5,
        }),

        prisma.lead.findMany({
            where: {
                status: { notIn: ["WON", "LOST"] },
                followUpAt: { lt: startToday },
            },
            orderBy: { followUpAt: "asc" },
            take: 5,
        }),

        prisma.lead.findMany({
            where: {
                createdAt: {
                    gte: new Date(now.getFullYear(), now.getMonth() - 5, 1),
                },
            },
            select: { createdAt: true },
            orderBy: { createdAt: "asc" },
        }),
    ]);

    const conversionRate = total > 0 ? Math.round((won / total) * 100) : 0;

    const monthLabels = Array.from({ length: 6 }).map((_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);

        return {
            key: `${date.getFullYear()}-${date.getMonth()}`,
            label: date.toLocaleDateString("th-TH", { month: "short" }),
            value: 0,
        };
    });

    for (const lead of chartLeads) {
        const date = new Date(lead.createdAt);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        const item = monthLabels.find((m) => m.key === key);

        if (item) item.value += 1;
    }

    const maxChartValue = Math.max(...monthLabels.map((m) => m.value), 1);

    const statusItems = [
        { label: "NEW", value: newLeads },
        { label: "CONTACTED", value: contacted },
        { label: "QUOTED", value: quoted },
        { label: "WON", value: won },
        { label: "LOST", value: lost },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <div className="rounded-[32px] border border-black/6 bg-white p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold text-[var(--bb-blue)]">
                            CRM Overview
                        </div>

                        <h1 className="mt-4 text-[34px] font-extrabold tracking-tight text-black md:text-[46px]">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-black/55">
                            วันนี้มี Follow-up {followTodayCount} รายการ และเลยกำหนด {overdueCount} รายการ
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link href="/admin/leads?follow=today" className="btn-outline">
                            งานวันนี้
                        </Link>

                        <Link href="/admin/leads" className="btn-primary">
                            ดู Lead ทั้งหมด
                        </Link>
                    </div>
                </div>
                <form
                    action="/admin/leads"
                    className="mt-6 rounded-[24px] border border-black/6 bg-white p-4 shadow-sm"
                >
                    <div className="grid gap-3 md:grid-cols-[1fr_140px]">
                        <input
                            name="q"
                            placeholder="ค้นหา Lead จากชื่อ / เบอร์ / อีเมล / บริการ"
                            className="h-12 rounded-2xl border border-black/10 px-4 text-sm font-semibold outline-none transition focus:border-[var(--bb-blue)]"
                        />

                        <button className="h-12 rounded-2xl bg-[var(--bb-blue)] px-5 text-sm font-bold text-white transition hover:opacity-90">
                            ค้นหา
                        </button>
                    </div>
                </form>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <KpiCard title="Lead ทั้งหมด" value={total} note="รวมทุกสถานะ" />
                    <KpiCard title="กำลังติดตาม" value={activeLeads} note="ยังไม่ WON / LOST" />
                    <KpiCard title="HIGH Priority" value={highPriority} note="งานสำคัญที่ยังไม่ปิด" />
                    <KpiCard title="Conversion" value={`${conversionRate}%`} note="WON / Total" />
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MiniCard title="วันนี้" value={today} tone="blue" />
                <MiniCard title="เดือนนี้" value={month} tone="cyan" />
                <MiniCard title="Follow-up วันนี้" value={followTodayCount} tone="amber" />
                <MiniCard title="เลยกำหนด" value={overdueCount} tone="rose" />
            </div>

            <div className="mt-6 rounded-[28px] border border-black/6 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-extrabold">Monthly Leads</h2>
                        <p className="mt-1 text-sm text-black/45">
                            จำนวน Lead ย้อนหลัง 6 เดือนล่าสุด
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex h-[220px] items-end gap-4 border-b border-black/6 pb-4">
                    {monthLabels.map((item) => {
                        const height = Math.max(
                            (item.value / maxChartValue) * 100,
                            item.value > 0 ? 10 : 3
                        );

                        return (
                            <div key={item.key} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
                                <div className="text-sm font-extrabold text-black/70">
                                    {item.value}
                                </div>

                                <div className="flex h-full w-full items-end justify-center">
                                    <div
                                        className="w-full max-w-[54px] rounded-t-2xl bg-[linear-gradient(180deg,var(--bb-blue)_0%,var(--bb-cyan)_100%)] shadow-sm transition hover:opacity-90"
                                        style={{ height: `${height}%` }}
                                    />
                                </div>

                                <div className="text-xs font-bold text-black/45">
                                    {item.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <TaskPanel
                    title="Follow-up วันนี้"
                    note="Lead ที่ควรติดต่อลูกค้าวันนี้"
                    leads={todayTasks}
                    emptyText="ไม่มี Follow-up วันนี้"
                />

                <TaskPanel
                    title="เลยกำหนด"
                    note="Lead ที่ยังไม่ปิดงานและเกินวันติดตาม"
                    leads={overdueTasks}
                    emptyText="ไม่มีรายการเลยกำหนด"
                    danger
                />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[28px] border border-black/6 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-extrabold">Lead Status</h2>
                    <p className="mt-1 text-sm text-black/45">สถานะ Lead ปัจจุบัน</p>

                    <div className="mt-6 grid gap-4">
                        {statusItems.map((item) => {
                            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;

                            return (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-bold text-black/70">{item.label}</span>
                                        <span className="text-black/45">
                                            {item.value} รายการ · {percent}%
                                        </span>
                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-black/[0.05]">
                                        <div
                                            className="h-full rounded-full bg-[linear-gradient(90deg,var(--bb-blue)_0%,var(--bb-cyan)_100%)]"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-[28px] border border-black/6 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-extrabold">Recent Leads</h2>
                            <p className="mt-1 text-sm text-black/45">Lead ล่าสุด 6 รายการ</p>
                        </div>

                        <Link href="/admin/leads" className="text-sm font-bold text-[var(--bb-blue)] hover:underline">
                            ดูทั้งหมด
                        </Link>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {recentLeads.map((lead) => (
                            <Link
                                key={lead.id}
                                href={`/admin/leads/${lead.id}`}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-black/6 bg-black/[0.015] p-4 transition hover:border-[var(--bb-blue)]/20 hover:bg-blue-50/50"
                            >
                                <div className="min-w-0">
                                    <div className="truncate font-bold text-black">{lead.name}</div>
                                    <div className="mt-1 truncate text-sm text-black/45">
                                        {lead.phone} · {lead.service || "-"}
                                    </div>
                                </div>

                                <div className="shrink-0 text-right">
                                    <StatusBadge status={lead.status} />
                                    <div className="mt-1 text-xs text-black/35">
                                        {new Date(lead.createdAt).toLocaleDateString("th-TH")}
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {recentLeads.length === 0 && (
                            <div className="rounded-2xl border border-black/6 p-6 text-center text-sm text-black/45">
                                ยังไม่มี Lead
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function KpiCard({
    title,
    value,
    note,
}: {
    title: string;
    value: number | string;
    note: string;
}) {
    return (
        <div className="relative overflow-hidden rounded-[28px] border border-black/6 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--bb-blue)_0%,var(--bb-cyan)_100%)]" />
            <div className="text-sm font-bold text-black/45">{title}</div>
            <div className="mt-3 text-4xl font-extrabold tracking-tight text-black">{value}</div>
            <div className="mt-2 text-sm text-black/45">{note}</div>
        </div>
    );
}

function MiniCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: number;
    tone: "blue" | "cyan" | "amber" | "rose";
}) {
    const map = {
        blue: "bg-blue-50 text-blue-700",
        cyan: "bg-cyan-50 text-cyan-700",
        amber: "bg-amber-50 text-amber-700",
        rose: "bg-rose-50 text-rose-700",
    };

    return (
        <div className="rounded-[24px] border border-black/6 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-black/45">{title}</div>
                <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${map[tone]}`}>
                    Live
                </span>
            </div>
            <div className="mt-3 text-3xl font-extrabold text-black">{value}</div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        NEW: "bg-blue-50 text-blue-600 border-blue-100",
        CONTACTED: "bg-cyan-50 text-cyan-600 border-cyan-100",
        QUOTED: "bg-violet-50 text-violet-600 border-violet-100",
        WON: "bg-emerald-50 text-emerald-600 border-emerald-100",
        LOST: "bg-rose-50 text-rose-600 border-rose-100",
    };

    return (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-extrabold ${map[status] || "border-black/10 bg-black/5 text-black/50"}`}>
            {status}
        </span>
    );
}

function TaskPanel({
    title,
    note,
    leads,
    emptyText,
    danger,
}: {
    title: string;
    note: string;
    leads: {
        id: number;
        name: string;
        phone: string;
        service: string | null;
        followUpAt: Date | null;
        status: string;
    }[];
    emptyText: string;
    danger?: boolean;
}) {
    return (
        <div className={`min-h-[260px] rounded-[28px] border p-6 shadow-sm ${danger ? "border-rose-100 bg-rose-50/30" : "border-black/6 bg-white"}`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-extrabold">{title}</h2>
                    <p className="mt-1 text-sm text-black/45">{note}</p>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${danger ? "bg-rose-100 text-rose-600" : "bg-amber-50 text-amber-700"}`}>
                    {leads.length}
                </span>
            </div>

            <div className="mt-5 grid gap-3">
                {leads.map((lead) => (
                    <Link
                        key={lead.id}
                        href={`/admin/leads/${lead.id}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-black/6 bg-white p-4 transition hover:border-[var(--bb-blue)]/20 hover:bg-blue-50/50"
                    >
                        <div className="min-w-0">
                            <div className="truncate font-bold text-black">{lead.name}</div>
                            <div className="mt-1 truncate text-sm text-black/45">
                                {lead.phone} · {lead.service || "-"}
                            </div>
                        </div>

                        <div className="shrink-0 text-right text-xs font-bold text-black/40">
                            {lead.followUpAt
                                ? new Date(lead.followUpAt).toLocaleDateString("th-TH")
                                : "-"}
                        </div>
                    </Link>
                ))}

                {leads.length === 0 && (
                    <div className="flex min-h-[96px] items-center justify-center rounded-2xl border border-black/6 bg-white p-6 text-center text-sm text-black/45">
                        {emptyText}
                    </div>
                )}
            </div>
        </div>
    );
}