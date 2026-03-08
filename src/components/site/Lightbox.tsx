"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Lightbox({
  open,
  src,
  title,
  onClose,
}: {
  open: boolean;
  src: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background: "rgba(255,255,255,0.85)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-3xl border border-black/10 bg-white shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <div className="font-extrabold">{title}</div>
          <button
            onClick={onClose}
            className="rounded-xl border border-black/10 px-3 py-2 text-sm font-semibold"
          >
            ปิด
          </button>
        </div>

        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image src={src} alt={title} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}