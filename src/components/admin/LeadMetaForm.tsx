"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  leadId: number;
  defaultPriority: string;
  defaultFollowUpAt?: Date | string | null;
};

export default function LeadMetaForm({
  leadId,
  defaultPriority,
  defaultFollowUpAt,
}: Props) {
  const router = useRouter();
  const [priority, setPriority] = useState(defaultPriority || "MEDIUM");
  const [followUpAt, setFollowUpAt] = useState(
    defaultFollowUpAt
      ? new Date(defaultFollowUpAt).toISOString().slice(0, 16)
      : ""
  );
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);

    await fetch(`/api/lead/${leadId}/meta`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priority,
        followUpAt: followUpAt || null,
      }),
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-extrabold text-black">Lead Management</h2>
      <p className="mt-1 text-sm text-black/45">
        กำหนดความสำคัญและวันติดตามลูกค้า
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr_120px]">
        <div className="grid gap-2">
          <label className="text-sm font-bold text-black/60">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold outline-none"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-black/60">Follow-up Date</label>
          <input
            type="datetime-local"
            value={followUpAt}
            onChange={(e) => setFollowUpAt(e.target.value)}
            className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm font-bold outline-none"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={save}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}