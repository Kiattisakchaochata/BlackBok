import Image from "next/image";

const baseClients = [
  "/clients/client1.png",
  "/clients/client2.png",
  "/clients/client3.png",
  "/clients/client4.png",
  "/clients/client5.png",
  "/clients/client6.png",
];

export default function ClientLogos() {
  return (
    <section className="relative overflow-hidden border-y border-black/5 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]">
      <div
        className="pointer-events-none absolute left-0 top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: "rgba(59,130,246,0.10)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "rgba(6,182,212,0.08)" }}
      />

      <div className="container-page relative py-10 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[30px] font-extrabold tracking-[-0.03em] text-black md:text-[38px]">
            ลูกค้าที่ไว้วางใจเรา
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-7 text-black/60 md:text-[17px]">
            ธุรกิจที่เลือกใช้บริการด้านเว็บไซต์ ระบบ และการตลาดดิจิทัลกับเรา
          </p>
        </div>

        <div className="client-marquee relative mt-8 px-6 md:px-8">
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f8fbff] to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f8fbff] to-transparent md:w-16" />

          <div className="client-marquee-track">
            <div className="client-marquee-group">
              {baseClients.map((logo, index) => (
                <LogoCard key={`group-a-${index}`} logo={logo} />
              ))}
            </div>

            <div className="client-marquee-group" aria-hidden="true">
              {baseClients.map((logo, index) => (
                <LogoCard key={`group-b-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCard({ logo }: { logo: string }) {
  return (
    <div className="flex h-[104px] w-[170px] shrink-0 items-center justify-center rounded-[24px] border border-black/6 bg-white/90 px-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_34px_rgba(15,23,42,0.09)] md:h-[108px] md:w-[182px]">
      <div className="relative h-[52px] w-full max-w-[112px] md:h-[56px] md:max-w-[120px]">
        <Image src={logo} alt="client logo" fill className="object-contain" />
      </div>
    </div>
  );
}