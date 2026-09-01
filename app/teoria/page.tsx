import Link from "next/link";
import Navbar from "../components/Navbar";
import { ArrowRightIcon, ArrowLeftIcon } from "../components/ui/icons";
import { HeaderDate } from "../components/ui/header-date";

const motivos = [
  {
    num: "I.",
    text: "abandone seus motivos habituais de movimento.",
  },
  {
    num: "II.",
    text: "deixe-se atrair pelas solicitações do terreno.",
  },
  {
    num: "III.",
    text: "a cidade se revela àqueles que se rendem a ela.",
  },
];

export default function Teoria() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">

        <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-5">

          {/* Topo */}
          <div className="flex flex-col gap-8">
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
                cap. i — teoria
              </p>
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
                <HeaderDate className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]" />
              </div>
            </header>

            <div>
              <h1 className="font-serif text-[64px] leading-[0.92] tracking-[-1.5px] text-[#1a1a18]">
                D&eacute;rive<span className="text-[#c8382a]">.</span>
              </h1>
              <div className="mt-4 h-px w-full bg-[#1a1a18]/20" />
            </div>

            <div className="flex flex-col gap-[28px]">
              {motivos.map((item) => (
                <div key={item.num} className="flex items-start gap-5">
                  <span className="w-5 shrink-0 font-editorial italic text-[18px] leading-[18px] text-[#c8382a]">
                    {item.num}
                  </span>
                  <p className="flex-1 font-editorial italic text-[20px] leading-[20px] tracking-[-0.2px] text-[#1a1a18]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col gap-[10px]">
            <Link
              href="/deriva/inicio"
              className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 transition-opacity duration-200 hover:opacity-90"
            >
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-white">
                iniciar deriva
              </span>
              <ArrowRightIcon className="size-6 text-white" />
            </Link>

            <Link
              href="/intro"
              className="flex h-[40px] w-full items-center justify-between rounded-[2px] bg-[#c8382a] px-4 transition-opacity duration-200 hover:opacity-90 "
            >
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-white">
                voltar
              </span>
              <ArrowLeftIcon className="size-6 text-white" />
            </Link>
          </div>
        </div>

        <Navbar active="I" />
      </section>
    </main>
  );
}
