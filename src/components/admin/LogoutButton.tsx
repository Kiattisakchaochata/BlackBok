"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className={
        compact
          ? "shrink-0 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-extrabold text-red-600 transition hover:bg-red-100"
          : "w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
      }
    >
      Logout
    </button>
  );
}