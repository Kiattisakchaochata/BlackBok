"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  leadId: number;
  defaultValue?: string | null;
};

export default function LeadNoteForm({ leadId, defaultValue }: Props) {
  const router = useRouter();
  const [note, setNote] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);

  async function saveNote(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/lead/${leadId}/note`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    });

    setLoading(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={saveNote}
      className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm"
    >
      <label className="text-sm font-bold text-black/60">Note ลูกค้า</label>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        placeholder="เช่น 25/06 โทรแล้ว ลูกค้าสนใจเว็บไซต์บริษัท นัดส่งราคา..."
        className="mt-3 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-[var(--bb-blue)]"
      />

      <button disabled={loading} className="btn-primary mt-3">
        {loading ? "กำลังบันทึก..." : "บันทึก Note"}
      </button>
    </form>
  );
}