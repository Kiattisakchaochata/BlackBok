import Image from "next/image";

const clients = [
  "/clients/client1.png",
  "/clients/client2.png",
  "/clients/client3.png",
  "/clients/client4.png",
  "/clients/client5.png",
  "/clients/client6.png",
];

export default function ClientLogos() {
  return (
    <section className="border-y border-black/10 bg-white">
      <div className="container-page py-12">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">
            ลูกค้าที่ไว้วางใจเรา
          </h2>

          <p className="mt-2 text-black/60">
            ธุรกิจที่เติบโตด้วย Website + Digital Marketing
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-10 items-center">
          {clients.map((logo) => (
            <div
              key={logo}
              className="relative h-12 grayscale hover:grayscale-0 transition"
            >
              <Image
                src={logo}
                alt="client logo"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}