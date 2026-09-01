import Link from "next/link"
import Navbar from "../../components/Navbar"
import { ArrowRightIcon, ArrowLeftIcon } from "../../components/ui/icons"
import { HeaderDate } from "../../components/ui/header-date"

export default function DerivaModo() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="relative mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] shadow-[0_10px_35px_rgba(0,0,0,0.14)]">

        <div className="flex flex-1 flex-col justify-between px-5 pt-5 pb-5">

          {/* Header + H1 */}
          <div className="flex flex-col gap-8 border-b border-[#cac9c5] pb-6">
            <header className="flex items-center justify-between">
              <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
                cap. iv — derivas
              </p>
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
                <HeaderDate className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]" />
              </div>
            </header>

            <div>
              <p className="font-serif text-[52px] leading-[100%] tracking-[-1.56px] text-[#1a1a18]">
                como você
              </p>
              <p className="font-editorial italic text-[34px] leading-normal text-[#6a6962]">
                vai sair?
              </p>
            </div>
          </div>

          {/* Modo buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/deriva"
              className="group relative flex items-center gap-1.5 border border-[#a7a6a1] p-5 transition-colors duration-200 hover:border-[#c8382a] hover:bg-[#f0ebe3]"
            >
              <span className="absolute left-[-1px] top-[-1px] h-[81px] w-[6px] bg-[#c8382a]" />
              <div className="flex flex-1 flex-col gap-1.5 pl-1">
                <p className="font-serif text-[22px] leading-[22px] tracking-[-0.44px] text-[#c8382a]">
                  com o telefone
                </p>
                <p className="font-sans text-[8px] uppercase tracking-[1.6px] text-[#1a1a18]">
                  instruções · fotos · registro
                </p>
              </div>
              <ArrowRightIcon className="size-6 shrink-0 text-[#c8382a] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/deriva/presenca"
              className="group relative flex items-center gap-1.5 border border-[#a7a6a1] p-5 transition-colors duration-200 hover:border-[#c8382a] hover:bg-[#f0ebe3]"
            >
              <span className="absolute left-[-1px] top-[-1px] h-[81px] w-[6px] bg-[#c8382a]" />
              <div className="flex flex-1 flex-col gap-1.5 pl-1">
                <p className="font-serif text-[22px] leading-[22px] tracking-[-0.44px] text-[#c8382a]">
                  telefone guardado
                </p>
                <p className="font-sans text-[8px] uppercase tracking-[1.6px] text-[#1a1a18]">
                  presença · notas · desenho
                </p>
              </div>
              <ArrowRightIcon className="size-6 shrink-0 text-[#c8382a] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Voltar */}
          <Link
            href="/arquivo/derivas"
            className="flex items-center justify-between rounded-[2px] bg-[#c8382a] px-4 py-3 transition-opacity duration-200 hover:opacity-90"
          >
            <p className="font-sans text-[12px] font-semibold uppercase tracking-[3.36px] text-white">
              voltar
            </p>
            <ArrowLeftIcon className="size-6 text-white" />
          </Link>

        </div>

        <Navbar active="II" />
      </section>
    </main>
  )
}
