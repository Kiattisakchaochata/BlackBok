"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Payload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<Payload>({
    name: "",
    phone: "",
    email: "",
    service: "FullFunnel",
    budget: "ไม่แน่ใจ",
    message: "",
  });

  function update<K extends keyof Payload>(key: K, value: Payload[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) throw new Error(data.error || "ส่งข้อมูลไม่สำเร็จ");

      router.push("/thank-you");
    } catch (e: any) {
      setErr(e?.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-semibold">ชื่อ-นามสกุล *</label>
        <input
          className="rounded-xl border border-black/15 px-4 py-3 outline-none"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold">เบอร์โทร *</label>
        <input
          className="rounded-xl border border-black/15 px-4 py-3 outline-none"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold">อีเมล</label>
        <input
          type="email"
          className="rounded-xl border border-black/15 px-4 py-3 outline-none"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold">สนใจบริการ</label>
          <select
            className="rounded-xl border border-black/15 px-4 py-3 outline-none bg-white"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="FullFunnel">ทำครบทั้ง Funnel</option>
            <option value="Website">ทำเว็บไซต์</option>
            <option value="System">ทำระบบหลังบ้าน</option>
            <option value="SEO">SEO + Content</option>
            <option value="Ads">Facebook/TikTok Ads</option>
            <option value="Tracking">Tracking (Pixel/GA/GTM)</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold">งบประมาณ</label>
          <select
            className="rounded-xl border border-black/15 px-4 py-3 outline-none bg-white"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="ไม่แน่ใจ">ไม่แน่ใจ</option>
            <option value="ต่ำกว่า 20,000">ต่ำกว่า 20,000</option>
            <option value="20,000 - 50,000">20,000 - 50,000</option>
            <option value="50,000 - 100,000">50,000 - 100,000</option>
            <option value="100,000+">100,000+</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold">รายละเอียดเพิ่มเติม</label>
        <textarea
          className="rounded-xl border border-black/15 px-4 py-3 outline-none min-h-[120px]"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="เช่น ต้องการเว็บกี่หน้า / ฟีเจอร์ / ตัวอย่างเว็บที่ชอบ / เป้าหมายการตลาด"
        />
      </div>

      {err && (
        <div className="rounded-xl p-3 text-sm border border-red-200 bg-red-50 text-red-700">
          {err}
        </div>
      )}

      <button disabled={loading} className="btn-primary">
        {loading ? "กำลังส่ง..." : "ส่งข้อมูลเพื่อขอใบเสนอราคา"}
      </button>

      <div className="text-xs text-black/50">*ข้อมูลนี้ใช้เพื่อการติดต่อกลับเท่านั้น</div>
    </form>
  );
}