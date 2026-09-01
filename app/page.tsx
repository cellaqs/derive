import Link from "next/link";
import { DeriveTitle } from "./components/ui/derive-title";
import { ArrowRightIcon } from "./components/ui/icons";
import { HeaderDate } from "./components/ui/header-date";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] px-5 pb-5 pt-5 shadow-[0_10px_35px_rgba(0,0,0,0.14)] ">

        {/* Conteúdo principal */}
        <div className="flex flex-1 flex-col justify-between">

          {/* Topo */}
          <div className="flex flex-col gap-5">
            {/* Header */}
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.7px] text-[#393936]">
                Internacional Situacionista
              </p>
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
                <HeaderDate className="font-sans text-[10px] uppercase tracking-[1.8px] text-[#1a1a18]" />
              </div>
            </header>

            {/* Título + subtítulo */}
            <div className="flex flex-col gap-6">
                <DeriveTitle />

              {/* Subtítulo */}
              <p className="font-editorial italic text-[20px] leading-[25px] text-[#32322f]">
                andar sem destino
                <br />
                é um ato político<span className="text-[#c8382a]">.</span>
              </p>
            </div>
          </div>

          {/* Rodapé */}
          <div className="flex flex-col gap-5">
            {/* Botão */}
            <Link
              href="/login"
              className="flex h-[56px] w-full items-center justify-between rounded-[2px] bg-[#1a1a18] px-4 font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white transition-opacity hover:opacity-90"
            >
              <span>iniciar</span>
              <ArrowRightIcon className="size-6" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
