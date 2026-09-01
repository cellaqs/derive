import Link from "next/link"
import Navbar from "./components/Navbar"
import { WaveLoader } from "./components/ui/wave-loader"
import { ArrowRightIcon } from "./components/ui/icons"

const ERROR_CODES = [".404", ".503", ".500", ".403", ".408"]

export default function NotFound() {
  const errorCode = ERROR_CODES[Math.floor(Math.random() * ERROR_CODES.length)]
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#1a1a18] px-5 pb-0 pt-5 shadow-[0_10px_35px_rgba(0,0,0,0.4)] ">
        <div className="flex flex-1 flex-col pb-5">

          {/* Topo */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
                erro — sistema
              </p>
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
                <span className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
                  deriva interrompida
                </span>
              </div>
            </header>

            <div className="flex flex-col gap-8">
              {/* "erro" grande */}
              <div className="flex flex-col gap-8">
                <p
                  className="font-serif text-[#f5f0e8] tracking-[-6.6px] leading-[80px]"
                  style={{ fontSize: "clamp(80px, 28vw, 110px)" }}
                >
                  erro
                </p>

                {/* Linha vermelha + código */}
                <div className="flex items-end gap-4">
                  <div className="h-[1.5px] flex-1 bg-[#c8382a]" />
                  <p className="font-serif text-[32px] leading-[25px] tracking-[-0.52px] text-[#c8382a]">
                    {errorCode}
                  </p>
                </div>
              </div>

              {/* Texto */}
              <div className="flex flex-col gap-4">
                <p className="font-serif text-[26px] leading-[27px] tracking-[-0.52px] text-[#f5f0e8]">
                  deriva interrompida.
                </p>
                <p className="font-sans text-[9px] uppercase tracking-[1.62px] text-[rgba(245,240,232,0.4)] leading-[14.6px]">
                  debord escreveu que o erro
                  <br />
                  é apenas outra forma de deriva.
                </p>
              </div>

              {/* WaveLoader — animação de loading */}
              <WaveLoader bars={28} />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Botão RECOMEÇAR */}
          <Link
            href="/"
            className="group flex h-[56px] w-full items-center justify-between border-b border-t border-[#c8382a] pl-1 pr-4 font-sans text-[12px] uppercase tracking-[3.36px] text-[#c8382a] transition-opacity duration-200 hover:opacity-70"
          >
            <span>recomeçar</span>
            <ArrowRightIcon className="size-6" />
          </Link>

        </div>

        <Navbar active="III" />
      </section>
    </main>
  )
}
