import type { ReactNode } from "react";
import FloatingParticles from "@/components/FloatingParticles";

type HeroSectionProps = {
  title: ReactNode;
  subtitle: string;
  footerContent?: ReactNode;
  centered?: boolean;
  showParticles?: boolean;
};

export default function HeroSection({
  title,
  subtitle,
  footerContent,
  centered = false,
  showParticles = true,
}: HeroSectionProps) {
  return (
    <section
      className={[
        "relative overflow-hidden px-4 sm:px-6 lg:px-8",
        centered
          ? "flex flex-1 items-center justify-center"
          : "pt-32 md:pt-36 pb-12 md:pb-12",
      ].join(" ")}
    >
      {/* 👇 Particles are now optional */}
      {showParticles && <FloatingParticles />}

      <div
        className={[
          "max-w-7xl mx-auto text-center relative z-10",
          centered && "-translate-y-12",
        ].join(" ")}
      >
        <h1 className="font-playfair text-5xl lg:text-7xl leading-[1.1] text-slate-900 text-balance mb-6 font-extrabold md:text-6xl tracking-[-0.035em]">
          {title}
        </h1>

        <p className="font-normal tracking-[-0.01em] leading-[1.5] text-slate-600 mb-8 max-w-3xl mx-auto text-pretty text-lg md:text-xl">
          {subtitle}
        </p>

        {footerContent && (
          <div className="flex flex-col gap-4 items-center">
            {footerContent}
          </div>
        )}
      </div>
    </section>
  );
}
