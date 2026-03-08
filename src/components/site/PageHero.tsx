type Props = {
  title: string;
  description: string;
};

export default function PageHero({ title, description }: Props) {
  return (
    <section className="container-page pt-8 pb-6 md:pt-10 md:pb-8">
      <div className="max-w-3xl">
        <h1 className="text-[28px] font-extrabold tracking-[-0.04em] leading-[1.04] text-black sm:text-[34px] md:text-[46px]">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-black/65 md:text-[17px]">
          {description}
        </p>
      </div>
    </section>
  );
}