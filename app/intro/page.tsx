import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "../components/ui/icons";

export default function Intro() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.2)]">

        {/* Background photo */}
        <Image
          src="/foto-cidade.jpg"
          alt="Cidade"
          fill
          className="object-cover object-center"
          priority
          sizes="390px"
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(30,30,30,0.85)] to-[rgba(51,51,51,0.28)]"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-5">

          {/* Top: header + quote separados por gap para quote cair em y≈381 */}
          <div className="flex flex-col gap-[346px]">
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-white">
                cap. i — origem
              </p>
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
                <span className="font-sans text-[9px] uppercase tracking-[1.8px] text-white">
                  fig. 02
                </span>
              </div>
            </header>

            {/* Quote com borda vermelha embaixo */}
            <div className="border-b-4 border-[#c8382a] pb-6 pr-4">
              <p
                className="font-serif text-white"
                style={{ fontSize: "30px", lineHeight: "28.5px", letterSpacing: "-0.6px" }}
              >
                &quot;A cidade
                <br />é um campo
                <br />de batalha
                <br />psicogeográfico.&quot;
              </p>
            </div>
          </div>

          {/* Bottom: membro + cidade + botão */}
          <div className="flex flex-col gap-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-white/70">
                  membro
                </p>
                <p className="font-serif text-[22px] leading-[22px] text-white">
                  nº 0247
                </p>
              </div>
              <div className="text-right">
                <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-white/70">
                  cidade
                </p>
                <p className="font-editorial italic text-[16px] leading-[26px] text-white">
                  são paulo
                </p>
              </div>
            </div>

            <Link
              href="/teoria"
              className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 transition-opacity duration-200 hover:opacity-90"
            >
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white">
                o que é uma dérive
              </span>
              <ArrowRightIcon className="size-6 text-white" />
            </Link>
          </div>

        </div>

      </section>
    </main>
  );
}
