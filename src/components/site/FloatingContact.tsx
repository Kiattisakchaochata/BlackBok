"use client";

import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaFacebookMessenger, FaLine } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
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

    function handleScroll() {
      setShowTopButton(window.scrollY > 180);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* To Top - ซ้าย */}
      <div
        className={`fixed left-4 z-[79] transition-all duration-300 md:left-6 ${
          showTopButton
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-white/90 text-[var(--bb-blue)] opacity-60 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-[2px] hover:opacity-100 hover:saturate-150 hover:shadow-[0_12px_26px_rgba(37,99,235,0.25)] active:translate-y-0 md:h-14 md:w-14"
        >
          <TopLayersIcon />
        </button>
      </div>

      {/* Contact - ขวา */}
      <div
        ref={wrapRef}
        className="fixed right-4 z-[80] flex flex-col items-end md:right-6"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
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
              href="https://line.me/ti/p/@biz56"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-lg transition hover:scale-[1.03] hover:shadow-xl"
            >
              <span className="mr-3 text-[15px] font-semibold text-[#1f2937]">
                แชทไลน์
              </span>
              <FaLine className="text-green-500" />
            </a>
          </div>
        )}

        <button
          onClick={toggleMenu}
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full text-white opacity-70 transition duration-300 hover:scale-105 hover:opacity-100 hover:saturate-150 hover:shadow-[0_16px_32px_rgba(37,99,235,0.35)] active:scale-95"
          style={{
            background:
              "linear-gradient(180deg, var(--bb-blue) 0%, var(--bb-blue-dark) 100%)",
            boxShadow: "0 10px 22px rgba(37,99,235,0.18)",
          }}
          aria-label="contact floating button"
        >
          {isOpen ? (
            <IoClose className="text-[26px]" />
          ) : (
            <FaFacebookMessenger className="text-[22px]" />
          )}
        </button>
      </div>

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
              <p className="text-lg font-bold text-[var(--bb-blue)]">0657151099</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="tel:0845552781"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600"
              >
                โทร 0657151099
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TopLayersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 15.5 12 11l5 4.5" />
      <path d="M7 10.5 12 6l5 4.5" />
      <path d="M6 19h12" />
    </svg>
  );
}