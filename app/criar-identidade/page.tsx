import Link from "next/link"
import { ArrowRightIcon } from "../components/ui/icons"

export default function CriarIdentidade() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#d9d7d2] sm:px-6 sm:py-6">
      <section className="mx-auto flex min-h-[851px] w-full sm:max-w-[390px] flex-col bg-[#fdfcf9] px-5 pb-5 pt-5 shadow-[0_10px_35px_rgba(0,0,0,0.14)] ">
        <div className="flex flex-1 flex-col justify-between">

          {/* Header */}
          <header className="flex items-center justify-between">
            <p className="font-sans text-[9px] uppercase tracking-[2.52px] text-[#6a6962]">
              Código pessoal
            </p>
            <span aria-hidden className="inline-block size-[6px] bg-[#c8382a]" />
          </header>

          {/* Conteúdo central */}
          <div className="flex flex-col gap-5">
            {/* Título com borda esquerda vermelha */}
            <div className="border-l-2 border-[#c8382a] pl-3">
              <div className="font-serif tracking-[-1.56px] text-[#1a1a18]">
                <p className="text-[52px] leading-[46.8px] mb-0">rabisque</p>
                <p className="text-[52px] leading-[46.8px]">
                  sua senha<span className="text-[#c8382a]">.</span>
                </p>
              </div>
            </div>

            {/* Subtítulo */}
            <p className="font-sans text-[9px] uppercase tracking-[1.8px] text-[#393936]">
              papel. parede. braço.
              <br />
              qualquer superfície fora desta tela.
            </p>

            {/* Nota */}
            <div className="border-t border-[#e0dbd3] pt-5">
              <p className="font-sans text-[9px] uppercase tracking-[1.8px] text-[#a7a6a1]">
                nesta versão, não existe recuperação de conta — apenas recomeço.
              </p>
            </div>
          </div>

          {/* Botão */}
          <Link
            href="/cadastro"
            className="group flex h-[56px] items-center justify-between border-b border-t border-[#1a1a18] pl-1 pr-4 font-sans text-[12px] uppercase tracking-[3.36px] text-[#1a1a18] transition-colors duration-200 hover:border-[#c8382a] hover:text-[#c8382a]"
          >
            <span>iniciar</span>
            <ArrowRightIcon className="size-6 transition-colors duration-200 group-hover:text-[#c8382a]" />
          </Link>

        </div>
      </section>
    </main>
  )
}
