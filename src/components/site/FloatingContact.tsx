"use client";

import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaFacebookMessenger, FaLine } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isOpen) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div
        ref={wrapRef}
        className="fixed right-4 z-[80] flex flex-col items-end md:right-6"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        {/* เมนูติดต่อ */}
        {isOpen && (
          <div className="mb-3 flex flex-col items-end space-y-3">
            <button
              onClick={() => {
                setShowPhoneModal(true);
                setIsOpen(false);
              }}
              className="flex min-h-[48px] items-center rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-lg transition hover:scale-[1.03] hover:shadow-xl"
            >
              <span className="mr-3 text-[15px] font-semibold text-[#1f2937]">
                โทรหาเรา
              </span>
              <FaPhoneAlt className="text-green-600" />
            </button>

            <a
              href="https://line.me/ti/p/4UQxyD8RTt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-lg transition hover:scale-[1.03] hover:shadow-xl"
            >
              <span className="mr-3 text-[15px] font-semibold text-[#1f2937]">
                แชทไลน์
              </span>
              <FaLine className="text-green-500" />
            </a>

            <button
              type="button"
              onClick={() => {
                window.open("https://m.me/715352691654101", "_blank");
                setIsOpen(false);
              }}
              className="flex min-h-[48px] items-center rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-lg transition hover:scale-[1.03] hover:shadow-xl"
            >
              <span className="mr-3 text-[15px] font-semibold text-[#1f2937]">
                แชทเฟซบุ๊ก
              </span>
              <FaFacebookMessenger className="text-[var(--bb-blue)]" />
            </button>
          </div>
        )}

        {/* ปุ่มหลัก */}
        <button
          onClick={toggleMenu}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-105 active:scale-95 md:h-16 md:w-16"
          style={{
            background:
              "linear-gradient(180deg, var(--bb-blue) 0%, var(--bb-blue-dark) 100%)",
            boxShadow: "0 14px 30px rgba(47,111,179,0.24)",
          }}
          aria-label="contact floating button"
        >
          {isOpen ? (
            <IoClose className="text-[28px]" />
          ) : (
            <FaFacebookMessenger className="text-[24px] md:text-[28px]" />
          )}
        </button>
      </div>

      {/* Modal แสดงเบอร์โทร */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="relative w-full max-w-sm rounded-3xl border border-black/10 bg-white p-6 text-center shadow-2xl">
            <button
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-black/5 hover:text-black"
              onClick={() => setShowPhoneModal(false)}
              aria-label="close phone modal"
            >
              <IoClose size={22} />
            </button>

            <h2 className="text-xl font-bold text-[#1f2937]">เบอร์โทรติดต่อ</h2>

            <div className="mt-4 space-y-2">
              <p className="text-lg font-bold text-[var(--bb-blue)]">084-555-2781</p>
              <p className="text-lg font-bold text-[var(--bb-blue)]">098-2512055</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="tel:0845552781"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600"
              >
                โทร 084-555-2781
              </a>

              <a
                href="tel:0982512055"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600"
              >
                โทร 098-2512055
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}