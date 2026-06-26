"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import FloatingContact from "@/components/site/FloatingContact";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 min-h-[calc(100dvh-74px)] pt-[74px] md:min-h-[calc(100dvh-72px)] md:pt-[72px]">
        {children}
      </main>

      <Footer />
      <FloatingContact />
    </>
  );
}