"use client";

import { useState } from "react";

type Props = {
  leadId: number;
  value: string;
};

export default function LeadStatusSelect({ leadId, value }: Props) {
  const [status, setStatus] = useState(value);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);

    try {
      await fetch(`/api/lead/${leadId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative inline-flex">
      <select
        value={status}
        disabled={loading}
        onChange={(e) => updateStatus(e.target.value)}
        className="h-9 min-w-[112px] appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 pr-8 text-xs font-bold text-slate-700 outline-none transition-all hover:border-blue-300 hover:bg-white focus:border-[var(--bb-blue)] focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
      >
        <option value="NEW">NEW</option>
        <option value="CONTACTED">CONTACTED</option>
        <option value="QUOTED">QUOTED</option>
        <option value="WON">WON</option>
        <option value="LOST">LOST</option>
      </select>

      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
        <ChevronDownIcon />
      </span>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5.5 7.5 10 12l4.5-4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}