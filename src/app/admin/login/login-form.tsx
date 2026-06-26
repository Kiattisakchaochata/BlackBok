"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setErr(data.error || "เข้าสู่ระบบไม่สำเร็จ");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#f4f8ff] px-4 py-20">
      <div className="mx-auto max-w-md rounded-[28px] border border-black/8 bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-extrabold">Admin Login</h1>
        <p className="mt-2 text-sm text-black/55">เข้าสู่ระบบหลังบ้าน The Black Bok</p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <input
            className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="rounded-2xl border border-black/10 px-4 py-3 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {err}
            </div>
          )}

          <button className="btn-primary" disabled={loading}>
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </main>
  );
}